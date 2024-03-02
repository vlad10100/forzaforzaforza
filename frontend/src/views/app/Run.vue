<template>
  <div class="md:flex w-full">
    <div class="fixed z-50 md:relative md:z-0">
      <SideBar
        v-if="athleteStore.athlete"
        @toggle="toggleSideBar"
        :is-side-bar-open="isSideBarOpen"
        :nav-links="NAVLINKS"
        :settings="SETTINGS"
        :user-data="athleteStore.athlete"
      ></SideBar>
    </div>

    <!-- INSET -->
    <div
      class="fixed inset-0 z-20 bg-white opacity-60"
      @click="smallScreen && isSideBarOpen ? (isSideBarOpen = false) : null"
      v-if="smallScreen && isSideBarOpen"
    />

    <!-- MAIN CONTENT -->
    <div class="flex w-full overflow-y-auto scrollbar max-h-[calc(100vh-64px)]">
      <div class="m-10 lg:mx-20 mx-5 w-full ml-20 md:ml-5">
        <div v-if="athleteStore.athlete && athleteStore.athlete.connected_to_strava">
          <AllActivities
            v-if="!selectedActivity"
            :is-loading="commonStore.isLoading"
            :activities="allActivities"
            @view-activity="viewActivity"
          />
          <ActivityDetails
            v-if="selectedActivity && activityData"
            :activity-data="activityData"
            @back="(selectedActivity = 0), (activityData = null)"
          />
        </div>
        <div v-else>
          <ConnectNow />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect, watch, ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useCommonStore } from '@/stores/common'
import { useAthleteStore } from '@/stores/athlete'
import { useStravaStore } from '@/stores/strava'
import {
  parseAveragePace,
  createSvgCode,
  parseMovingTime,
  parseDate
} from '@/stores/strava/parsers'
import type { Activity } from '@/stores/strava/parsers'

import { db } from '@/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

import SideBar from '@/components/sidebar/SideBar.vue'
import AllActivities from '@/views/app/AllActivities.vue'
import ConnectNow from '@/views/app/ConnectNow.vue'
import ActivityDetails from './ActivityDetails.vue'

const { width } = useWindowSize()
const isSideBarOpen = ref(false)
const smallScreen = ref(false)
const selectedActivity = ref(0)
const activityData = ref()

const commonStore = useCommonStore()
const athleteStore = useAthleteStore()
const stravaStore = useStravaStore()

const activities2023 = ref<Activity[]>([])
const activities2024 = ref<Activity[]>([])

const allActivities = computed(() => {
  const activities = [...activities2024.value, ...activities2023.value].filter(
    (activity: Activity) => {
      if (activity.sport_type === 'Run') {
        activity.date = parseDate(activity.start_date_local)
        activity.parsed_moving_time = parseMovingTime(activity.moving_time)
        activity.parsed_average_pace = parseAveragePace(activity.average_speed)
        activity.svg_path = createSvgCode(activity.map.summary_polyline, 200)
        return activity
      }
    }
  )
  return activities
})

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

    if (data) {
      activities2024.value = data[2024]
      activities2023.value = data[2023]
    }
    console.log('done')
    commonStore.isLoading = false
    return
  }
})

watch(
  () => width.value,
  (newVal) => {
    if (newVal < 768) {
      smallScreen.value = true
    } else smallScreen.value = false
  }
)

onMounted(() => {
  commonStore.isLoading = true
  if (width.value < 768) {
    smallScreen.value = true
  } else smallScreen.value = false

  setTimeout(() => {
    if (commonStore.isFetchingUser) return
  }, 1000)
})

const toggleSideBar = () => {
  isSideBarOpen.value = !isSideBarOpen.value
}

const viewActivity = async (id: number) => {
  commonStore.isLoading = true
  selectedActivity.value = id
  const activity = allActivities.value.find((activity) => activity.id === id)
  const activityDetails = await stravaStore.getActivityById(
    id,
    athleteStore.athlete.strava_refresh_token
  )
  if (activity && activityDetails) {
    console.log(activityDetails)
    const parsedActivityData = {
      id: activity.id,
      name: activity.name,
      average_pace: activity.parsed_average_pace,
      average_heartrate: activity.average_heartrate,
      date: activity.date,
      parsed_moving_time: activity.parsed_moving_time,
      splits_metric: activityDetails.splits_metric,
      gear: activityDetails.gear,
      device_name: activityDetails.device_name,
      workout_type: activityDetails.workout_type,
      svg_path: activity.svg_path,
      laps_metric: activityDetails.laps
    }
    activityData.value = parsedActivityData
  }
  commonStore.isLoading = false
}

const NAVLINKS = [
  { label: 'NavLink 1', value: 'link-1', style: 'bg-yellow-400' },
  { label: 'NavLink 2', value: 'link-2', style: 'bg-orange-400' },
  { label: 'NavLink 3', value: 'link-3', style: 'bg-pink-400' },
  { label: 'NavLink 4', value: 'link-4', style: 'bg-violet-400' },
  { label: 'NavLink 5', value: 'link-5', style: 'bg-blue-400' }
]

const SETTINGS = [
  { label: 'Settings', value: 'link-s', style: 'bg-yellow-400' },
  { label: 'Notifications', value: 'link-a', style: 'bg-orange-400' },
  { label: 'Log out', value: 'link-b', style: 'bg-pink-400' }
]
</script>

<style scoped></style>
