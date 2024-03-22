<template>
  <div class="flex flex-col items-center justify-center pt-10 pb-20 w-full">
    <div class="space-y-5">
      <div>
        <p>Splits</p>
        <div v-html="barChart"></div>
      </div>

      <div v-if="lapsMetric.length > 2">
        <p>Speed</p>
        <div v-html="speed"></div>
      </div>
      <div v-if="hasHeartrate">
        <p>Heartrate</p>
        <div v-html="lineChart"></div>
      </div>
      <div v-if="hasCadence">
        <p>Cadence</p>
        <div v-html="cadence"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createLineChart } from '@/stores/strava/charts/line'
import { createBarChart } from '@/stores/strava/charts/bars'
import type { Lap, Splits } from '@/stores/strava/parsers'

const { splitsMetric, lapsMetric, manual, hasCadence, hasHeartrate } = defineProps({
  splitsMetric: {
    type: Array as () => Splits[],
    required: true,
  },
  lapsMetric: {
    type: Array as () => Lap[],
    required: true,
  },
  manual: {
    type: Boolean,
  },
  hasHeartrate: {
    type: Boolean,
  },
  hasCadence: {
    type: Boolean,
  },
})
const lineChart = ref('')
const cadence = ref('')
const barChart = ref('')
const speed = ref('')

onMounted(() => {
  if (manual) return
  const distanceSplits = splitsMetric.map(split => split.split - 1)

  const bar = createBarChart(splitsMetric, hasHeartrate)
  barChart.value = bar?.outerHTML || ''

  const paceLine = createLineChart(lapsMetric, distanceSplits, 'average_speed')
  speed.value = paceLine?.outerHTML || ''

  if (hasHeartrate) {
    const averageHR = { label: 'avg. HR', value: 140 } // this will vary
    const line = createLineChart(lapsMetric, distanceSplits, 'average_heartrate', averageHR)
    lineChart.value = line?.outerHTML || ''
  }

  if (hasCadence) {
    const cadenceLine = createLineChart(lapsMetric, distanceSplits, 'average_cadence')
    cadence.value = cadenceLine?.outerHTML || ''
  }
})
</script>

<style scoped></style>
