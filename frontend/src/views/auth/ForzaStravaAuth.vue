<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAthleteStore } from '@/stores/athlete'
import { useCommonStore } from '@/stores/common'

import { db } from '@/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()
const athleteStore = useAthleteStore()
const commonStore = useCommonStore()

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
    if (!code || !athlete || !resfreshToken) {
      router.push('/')
      return
    }

    athlete.connected_to_strava = true
    athlete.strava_refresh_token = resfreshToken
    await updateDoc(athleteDoc, athlete)
    router.push('/')
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
