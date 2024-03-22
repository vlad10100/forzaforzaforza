<template>
  <div class="space-y-5">
    <div
      class="flex items-center gap-2"
      @click="$emit('back')"
    >
      <IcChevron direction="left" />
      <p class="text-sm">back to activities</p>
    </div>
    <div>
      <div class="rounded-lg shadow-md max-w-[350px] w-full mx-auto">
        <div class="bg-gray-50 flex justify-center py-10 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
          >
            <path
              :d="activityData.svg_path"
              fill="none"
              stroke="black"
              stroke-width="3"
            ></path>
          </svg>
        </div>
      </div>
      <div>
        <ActivityCharts
          v-if="!activityData.manual"
          :splits-metric="activityData.splits_metric"
          :laps-metric="activityData.laps_metric"
          :manual="activityData.manual"
          :has-heartrate="activityData.has_heartrate"
          :has-cadence="activityData.has_cadence"
        ></ActivityCharts>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IcChevron from '@/components/icons/IcChevron.vue'
import ActivityCharts from '@/views/app/ActivityCharts.vue'

const emit = defineEmits(['back'])
defineProps({
  activityData: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped></style>
