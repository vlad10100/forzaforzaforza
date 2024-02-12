<template>
  <div>
    <div>RUN!</div>
    <div>
      <p class="py-10" v-for="(activity, index) in activities" :key="index">
        {{ activity }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect, ref } from 'vue'
import { useCommonStore } from '@/stores/common'
import { useAthleteStore } from '@/stores/athlete'

const commonStore = useCommonStore()
const athleteStore = useAthleteStore()

const activities = ref([])

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

const getAthleteActivities = async (refreshToken: string) => {
  const authTokens = await auth(refreshToken)

  const access_token = authTokens.access_token
  const before = 1704067199 // end of 2024
  const after = 1672531200 // start of 2023
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
  console.log(data)
  activities.value = data
}

watchEffect(async () => {
  if (!commonStore.isFetchingUser) {
    commonStore.isLoading = true
    const userId = commonStore.signedInUser.uid
    const athlete = await athleteStore.loadAthlete(userId)
    if (!athlete || !athlete.connected_to_strava) return
    getAthleteActivities(athlete.strava_refresh_token)
    commonStore.isLoading = false
  }
})
onMounted(() => {
  commonStore.isLoading = true
  setTimeout(() => {
    if (commonStore.isFetchingUser) return
    commonStore.isLoading = false
  }, 1000)
})
</script>

<style scoped></style>
