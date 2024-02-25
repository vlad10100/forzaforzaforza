<template>
  <div>
    <div class="text-3xl" v-if="!isLoading">All Activities</div>
    <div class="py-10" v-for="(activity, index) in activities" :key="index">
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
</template>

<script setup lang="ts">
type Activity = {
  id: Number
  name: String
  sport_type: String
  start_date_local: Date
  max_heartrate: Number
  svg_path: string
  distance: number
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
