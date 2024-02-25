import { defineStore } from 'pinia'
import { decode } from '@googlemaps/polyline-codec'
import * as d3 from 'd3'

type LatLng = [number, number]

interface Athlete {
  id: string
  resource_state: number
}

interface Map {
  id: string
  summary_polyline: string
  resource_state: number
}

type Activity = {
  resource_state: number
  athlete: Athlete
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  sport_type: string
  workout_type: number
  id: string
  start_date: string
  start_date_local: string
  timezone: string
  utc_offset: number
  location_city: string | null
  location_state: string | null
  location_country: string
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  map: Map
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  visibility: string
  flagged: boolean
  gear_id: string | null
  start_latlng: LatLng
  end_latlng: LatLng
  average_speed: number
  max_speed: number
  has_heartrate: boolean
  heartrate_opt_out: boolean
  display_hide_heartrate_option: boolean
  elev_high: number
  elev_low: number
  upload_id: string
  upload_id_str: string
  external_id: string
  from_accepted_tag: boolean
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
  svg_path: string
  parsed_date: string
  parsed_moving_time: string
  average_pace: string
}

export const useStravaStore = defineStore('stravaStore', () => {
  const auth = async (refreshToken: string) => {
    const url = 'https://www.strava.com/api/v3/oauth/token'
    const payload = {
      client_id: 116994,
      client_secret: '6a7a6e7e6b904473e89876996c9da484d8b6c777',
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const createSvgCode = (polylineSummary: string) => {
    const decodedPolyline: [number, number][] = decode(polylineSummary, 5)
    type BoundingBox = {
      x: [number, number] | [undefined, undefined]
      y: [number, number] | [undefined, undefined]
    }
    const boundingBox: BoundingBox = {
      x: d3.extent(decodedPolyline, (d) => d[1]),
      y: d3.extent(decodedPolyline, (d) => d[0])
    }

    const xScale = d3
      .scaleLinear()
      .domain(boundingBox.x as [Number, Number])
      .range([5, 195])
    const yScale = d3
      .scaleLinear()
      .domain(boundingBox.y as [Number, Number])
      .range([195, 5])
    const pathGenerator = d3
      .line()
      .x((d) => xScale(d[1]))
      .y((d) => yScale(d[0]))

    const generatedPath = pathGenerator(decodedPolyline)
    return generatedPath
  }

  const parseDate = (date: string) => {
    const timestamp = new Date(date)
    const parsedDate = timestamp.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    return parsedDate
  }

  const parseMovingTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return hours + ' hrs ' + minutes + ' mins ' + remainingSeconds + ' secs'
  }

  const parseAveragePace = (pace: number) => {
    const speedKmPerMin = pace * (60 / 1000)
    const minPerKm = 1 / speedKmPerMin

    const minutes = Math.floor(minPerKm)
    const seconds = Math.round((minPerKm - minutes) * 60)

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ' min/km'
  }

  const getAthleteActivities = async (refreshToken: string, after: Number, before: Number) => {
    const authTokens = await auth(refreshToken)
    const access_token = authTokens.access_token
    const headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }

    const url = `https://www.strava.com/api/v3/activities?before=${before}&after=${after}&per_page=200&access_token=${access_token}`

    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    const data = await response.json()
    const activitiesWithPolylineSvg = data.map((activity: Activity) => {
      const svg_path = createSvgCode(activity.map.summary_polyline)
      const parsedDate = parseDate(activity.start_date_local)
      const movingTime = parseMovingTime(activity.moving_time)
      const averagePace = parseAveragePace(activity.average_speed)
      activity.svg_path = svg_path || ''
      activity.parsed_date = parsedDate || ''
      activity.parsed_moving_time = movingTime || ''
      activity.average_pace = averagePace || ''
      return activity
    })
    return activitiesWithPolylineSvg
  }

  return { getAthleteActivities }
})
