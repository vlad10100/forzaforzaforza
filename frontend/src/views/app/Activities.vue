<template>
  <div>
    <!-- LOADING -->
    <div
      class="fixed inset-0 bg-white z-50 bg-opacity-75 top-16"
      v-if="isLoading"
    >
      <div class="h-full flex items-center justify-center">
        <Loader size="200" />
      </div>
    </div>
    <AllActivities
      v-if="!selectedActivity"
      :is-loading="isLoading"
      :activities="allActivities"
      @view-activity="viewActivity"
      @refresh-activity="refreshActivity"
    />
    <ActivityDetails
      v-if="selectedActivity && activityData"
      :activity-data="activityData"
      @back="(selectedActivity = 0), (activityData = null)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, inject } from 'vue'

// axios
import type { Axios } from 'axios'
const axios = inject('axios') as Axios
import dayjs from 'dayjs'

import { parseAveragePace, createSvgCode, parseMovingTime, parseDate } from '@/stores/strava/parsers'
import type { Activity } from '@/stores/strava/parsers'

import AllActivities from '@/views/app/AllActivities.vue'
import ActivityDetails from './ActivityDetails.vue'
import Loader from '@/components/common/Loader.vue'

const selectedActivity = ref(0)
const athleteActivities = ref([])
const activityData = ref()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  const { data } = await axios.get('/strava/athlete-activities')
  athleteActivities.value = data

  isLoading.value = false
})

const allActivities = computed((): Activity[] => {
  const activities = athleteActivities.value.filter((activity: Activity) => {
    if (activity.sport_type === 'Run') {
      activity.date = parseDate(activity.start_date_local)
      activity.parsed_moving_time = parseMovingTime(activity.moving_time)
      activity.average_pace = parseAveragePace(activity.average_speed)
      activity.svg_path = createSvgCode(activity.summary_polyline, 200)
      return activity
    }
  })
  return activities
})

const viewActivity = async (id: number) => {
  isLoading.value = true

  selectedActivity.value = id

  try {
    const activity = (athleteActivities.value as Activity[]).find(item => item.activity_id === id)
    if (!activity) return

    const { data } = await axios.get(`/strava/athlete/activity/${id}`)
    const details = {
      svg_path: createSvgCode(activity.summary_polyline, 200),
      splits_metric: data.splits_metric,
      laps_metric: data.laps_metric,
      has_heartrate: data.has_heartrate,
      has_cadence: data.average_cadence ? true : false,
      manual: data.manual,
    }
    activityData.value = details
  } catch (error) {
    console.log(error)
  }

  isLoading.value = false
}

const refreshActivity = async () => {
  isLoading.value = true
  const today = new Date()
  const before = dayjs(today).unix()

  const lastActivity = new Date(allActivities.value[0].activity_date)
  const after = dayjs(lastActivity).unix()

  await axios.post(`/strava/activities/${after}/${before}`)

  window.location.reload()
}
</script>

<style scoped></style>
