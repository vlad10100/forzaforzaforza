<template>
  <div class="md:flex w-full">
    <div class="fixed z-50 md:relative md:z-0">
      <SideBar
        @toggle="toggleSideBar"
        :is-side-bar-open="isSideBarOpen"
        :nav-links="NAVLINKS"
        :settings="SETTINGS"
      ></SideBar>
    </div>

    <!-- INSET -->
    <div
      class="fixed inset-0 z-20 bg-white opacity-60"
      @click="smallScreen && isSideBarOpen ? (isSideBarOpen = false) : null"
      v-if="smallScreen && isSideBarOpen"
    />

    <div class="flex w-full overflow-y-auto scrollbar max-h-[calc(100vh-64px)]">
      <div class="m-10 lg:mx-20 mx-5 w-full ml-20 md:ml-5">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect, watch, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useCommonStore } from '@/stores/common'
import { useAthleteStore } from '@/stores/athlete'
import { useStravaStore } from '@/stores/strava'
import { db } from '@/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

import SideBar from '@/components/sidebar/SideBar.vue'

const { width } = useWindowSize()
const isSideBarOpen = ref(false)
const smallScreen = ref(false)

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
    commonStore.isLoading = false
  }, 1000)
})

const toggleSideBar = () => {
  isSideBarOpen.value = !isSideBarOpen.value
}

const NAVLINKS = [
  { label: 'NavLink 1', value: 'link-1', style: 'bg-yellow-400' },
  { label: 'NavLink 2', value: 'link-2', style: 'bg-orange-400' },
  { label: 'NavLink 3', value: 'link-3', style: 'bg-pink-400' },
  { label: 'NavLink 4', value: 'link-4', style: 'bg-violet-400' },
  { label: 'NavLink 5', value: 'link-5', style: 'bg-blue-400' },
  { label: 'NavLink 6', value: 'link-6', style: 'bg-indigo-400' },
  { label: 'NavLink 7', value: 'link-7', style: 'bg-green-400' },
  { label: 'NavLink 8', value: 'link-8', style: 'bg-teal-400' },
  { label: 'NavLink 9', value: 'link-9', style: 'bg-orange-400' },
  { label: 'NavLink 10', value: 'link-10', style: 'bg-blue-400' },
  { label: 'NavLink 11', value: 'link-11', style: 'bg-indigo-400' },
  { label: 'NavLink 12', value: 'link-12', style: 'bg-green-400' },
  { label: 'NavLink 13', value: 'link-13', style: 'bg-teal-400' },
  { label: 'NavLink 14', value: 'link-14', style: 'bg-orange-400' }
]

const SETTINGS = [
  { label: 'Settings', value: 'link-s', style: 'bg-yellow-400' },
  { label: 'Notifications', value: 'link-a', style: 'bg-orange-400' },
  { label: 'Log out', value: 'link-b', style: 'bg-pink-400' }
]
</script>

<style scoped></style>
