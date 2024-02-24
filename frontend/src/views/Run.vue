<template>
  <div>
    <div class="text-center">
      <div class="text-3xl" v-if="!commonStore.isLoading">All Activities</div>
      <div class="py-10" v-for="(activity, index) in activities2024" :key="index">
        <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
            <path :d="activity.svg_path" fill="none" stroke="#e85d04" stroke-width="3"></path>
          </svg>
        </div>
        <p>Distance: {{ (activity.distance / 1000).toFixed(2) }}</p>
        <p>Type: {{ activity.sport_type }}</p>
        <p>Name: {{ activity.name }}</p>
        <p>Max HR: {{ activity.max_heartrate }}</p>
        <p>Date: {{ activity.start_date_local }}</p>
      </div>
      <div class="py-10" v-for="(activity, index) in activities2023" :key="index">
        <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
            <path :d="activity.svg_path" fill="none" stroke="#e85d04" stroke-width="3"></path>
          </svg>
        </div>
        <p>Distance: {{ (activity.distance / 1000).toFixed(2) }}</p>
        <p>Type: {{ activity.sport_type }}</p>
        <p>Name: {{ activity.name }}</p>
        <p>Max HR: {{ activity.max_heartrate }}</p>
        <p>Date: {{ activity.start_date_local }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect, ref } from 'vue'
import { useCommonStore } from '@/stores/common'
import { useAthleteStore } from '@/stores/athlete'
import { useStravaStore } from '@/stores/strava'
import { db } from '@/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

const commonStore = useCommonStore()
const athleteStore = useAthleteStore()
const stravaStore = useStravaStore()

const activities2023 = ref<Activity[]>([])
const activities2024 = ref<Activity[]>([])

type Activity = {
  id: Number
  name: String
  sport_type: String
  start_date_local: Date
  max_heartrate: Number
  svg_path: string
  distance: number
}

watchEffect(async () => {
  if (!commonStore.isFetchingUser) {
    if (!commonStore.signedInUser) {
      commonStore.isLoading = false
      return
    }

    commonStore.isLoading = true
    const userId = commonStore.signedInUser.uid
    const athlete = await athleteStore.loadAthlete(userId)
    if (!athlete || !athlete.connected_to_strava) {
      commonStore.isLoading = false
      return
    }

    const athleteDoc = doc(db, 'athletes', userId)
    const stravaRef = collection(athleteDoc, 'strava')
    const stravaDoc = doc(stravaRef, 'activities')
    const activities = await getDoc(stravaDoc)
    const data = activities.data()
    console.log(data)

    if (data) {
      activities2024.value = data[2024]
      activities2023.value = data[2023]
    }
    commonStore.isLoading = false
    return
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
