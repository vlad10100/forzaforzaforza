import { decode } from '@googlemaps/polyline-codec'
import * as d3 from 'd3'
import * as dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export const parseDate = (date: string) => {
  const timestamp = new Date(date)
  const parsedDate = timestamp.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return parsedDate
}

export const parseMovingTime = (seconds: number) => {
  const duration = dayjs.duration(seconds, 'seconds')
  return duration.format('HH:mm:ss')
}

export const parseAveragePace = (pace: number) => {
  const speedKmPerMin = pace * (60 / 1000)
  const minPerKm = 1 / speedKmPerMin

  const minutes = Math.floor(minPerKm)
  const seconds = Math.round((minPerKm - minutes) * 60)

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const convertToMinPerKm = (average_speed: number) => {
  return 1 / (average_speed * (60 / 1000))
}

export const createSvgCode = (polylineSummary: string, size: number) => {
  const decodedPolyline: [number, number][] = decode(polylineSummary, 5)
  type BoundingBox = {
    x: [number, number] | [undefined, undefined]
    y: [number, number] | [undefined, undefined]
  }
  const boundingBox: BoundingBox = {
    x: d3.extent(decodedPolyline, d => d[1]),
    y: d3.extent(decodedPolyline, d => d[0]),
  }

  const xScale = d3
    .scaleLinear()
    .domain(boundingBox.x as [Number, Number])
    .range([5, size - 5])
  const yScale = d3
    .scaleLinear()
    .domain(boundingBox.y as [Number, Number])
    .range([size - 5, 5])
  const pathGenerator = d3
    .line()
    .x(d => xScale(d[1]))
    .y(d => yScale(d[0]))

  const generatedPath = pathGenerator(decodedPolyline)
  if (!generatedPath) return ''
  return generatedPath
}

export const parseSplitsMetric = (metrics: Splits[]) => {
  const totalSplits = metrics.length
  return metrics.map((split: Splits, index: number) => {
    const minPerKm = convertToMinPerKm(split.average_speed)
    if (index === totalSplits - 1) {
      const lastSplitDistance = split.distance / 1000
      if (lastSplitDistance < 0.95) {
        split.split = Math.round(lastSplitDistance * 10) / 10
      }
    }

    return {
      average_pace: Math.round(minPerKm * 1000) / 1000,
      parsed_average_pace: parseAveragePace(split.average_speed),
      pace_zone: split.pace_zone,
      average_heartrate: split.average_heartrate,
      average_grade_adjusted_speed: split.average_grade_adjusted_speed,
      elevation_difference: split.elevation_difference,
      elapsed_time: split.elapsed_time,
      moving_time: split.moving_time,
      distance: split.distance,
      split: split.split,
    }
  })
}

export const parseLapsMetric = (metrics: Lap[]) => {
  return metrics.map(lap => {
    return {
      split: lap.split,
      lap_index: lap.lap_index,
      average_heartrate: lap.average_heartrate,
      elapsed_time: lap.elapsed_time,
      moving_time: lap.moving_time,
      average_watts: lap.average_watts,
      distance: lap.distance,
      average_cadence: lap.average_cadence,
      pace_zone: lap.pace_zone + 1,
      average_speed: convertToMinPerKm(lap.average_speed),
    }
  })
}

type LineData = {
  [key: string]: number
  lap_index: number
}
export const parseLineData = (metrics: Lap[], metric: string): [number, number][] => {
  return metrics.map((lap: LineData) => [lap[metric], lap.lap_index])
}

export type Splits = {
  distance: number
  elapsed_time: number
  elevation_difference: number
  moving_time: number
  split: number
  average_speed: number
  average_grade_adjusted_speed: number
  average_heartrate: number
  pace_zone: number
}

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

export type Activity = {
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
  activity_id: number
  activity_date: string
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
  date: string
  parsed_average_pace: string
  max_heartrate: number
  average_heartrate: number
  summary_polyline: string
}

export type Lap = {
  elapsed_time: number
  moving_time: number
  distance: number
  average_speed: number
  max_speed: number
  lap_index: number
  split: number
  average_cadence: number
  average_watts: number
  average_heartrate: number
  pace_zone: number
}
