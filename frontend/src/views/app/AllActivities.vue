<template>
  <div>
    <div class="text-3xl my-10" v-if="!isLoading">All Activities</div>
    <div class="space-y-10">
      <div class="" v-for="(activity, index) in activities" :key="index">
        <div class="border rounded-lg shadow-md max-w-[600px] w-full divide-y divide-gray-300">
          <div class="flex justify-center md:px-10 px-5 md:py-5 py-2 bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <path :d="activity.svg_path" fill="none" stroke="#e85d04" stroke-width="3"></path>
            </svg>
          </div>
          <div class="text-left md:px-10 px-2 md:py-5 py-2">
            <div class="my-2">
              <p class="md:text-xs text-[11px]">{{ activity.parsed_date }}</p>
              <p class="text-lg">{{ activity.name }}</p>
            </div>
            <div class="md:text-sm text-xs">
              <p>Distance: {{ (activity.distance / 1000).toFixed(2) }} kilometers</p>
              <p>Avg. pace: {{ activity.average_pace }}</p>
              <p>
                Moving time: <span class="truncate">{{ activity.parsed_moving_time }}</span>
              </p>
              <p>Avg. heartrate: {{ activity.average_heartrate }}bpm</p>
              <p>Max heartrate: {{ activity.max_heartrate }}bpm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Activity = {
  id: Number
  name: String
  sport_type: String
  parsed_date: String
  max_heartrate: Number
  svg_path: string
  distance: number
  average_heartrate: Number
  average_pace: string
  parsed_moving_time: string
}

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  activities: {
    type: Array as () => Activity[],
    required: true
  }
})
</script>

<style scoped></style>
