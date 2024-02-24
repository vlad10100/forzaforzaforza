<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAthleteStore } from '@/stores/athlete'
import { useCommonStore } from '@/stores/common'
import { useStravaStore } from '@/stores/strava'

import { db } from '@/firebase'
import { doc, updateDoc, collection, getDoc, setDoc } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()
const athleteStore = useAthleteStore()
const commonStore = useCommonStore()
const stravaStore = useStravaStore()

const authenticate = async (code: string) => {
  const url = 'https://www.strava.com/api/v3/oauth/token'
  const payload = {
    client_id: 116994,
    client_secret: '6a7a6e7e6b904473e89876996c9da484d8b6c777',
    code: code,
    grant_type: 'authorization_code'
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
    return data.refresh_token
  } catch (error) {
    console.log(error)
    console.error('Error occurred during authentication:', error)
  }
}

watchEffect(async () => {
  if (!commonStore.isFetchingUser) {
    commonStore.isLoading = true
    const code: string = route.query.code as string

    const userId = commonStore.signedInUser.uid
    const athlete = await athleteStore.loadAthlete(userId)

    const resfreshToken = await authenticate(code)
    const athleteDoc = doc(db, 'athletes', userId)
    const stravaRef = collection(athleteDoc, 'strava')
    const stravaDoc = doc(stravaRef, 'activities')
    const activities = await getDoc(stravaDoc)
    const data = activities.data()

    if (!code || !athlete || !resfreshToken) {
      router.push('/')
      return
    }

    athlete.connected_to_strava = true
    athlete.strava_refresh_token = resfreshToken
    await updateDoc(athleteDoc, athlete)

    const _2023 = 1640966400
    const _2025 = 1735660800 // end of 2024
    const _2024 = 1704038400 // start of 2023

    if (!data || !data[2023] || !data[2024]) {
      const stravaDoc = doc(stravaRef, 'activities')
      const data2023 = await stravaStore.getAthleteActivities(
        athlete.strava_refresh_token,
        _2023,
        _2024
      )
      const data2024 = await stravaStore.getAthleteActivities(
        athlete.strava_refresh_token,
        _2024,
        _2025
      )
      await setDoc(stravaDoc, { 2023: data2023, 2024: data2024 })
    }
    router.push('/run')
  }
})
onMounted(() => {
  commonStore.isLoading = true
})
</script>

<style scoped></style>
