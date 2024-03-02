import { defineStore } from 'pinia'

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
    return data
  }

  const getActivityById = async (id: number, refreshToken: string) => {
    const authTokens = await auth(refreshToken)
    const access_token = authTokens.access_token
    const headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    const url = `https://www.strava.com/api/v3/activities/${id}`

    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    const data = await response.json()
    return data
  }

  return { getAthleteActivities, getActivityById }
})
