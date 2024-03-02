<template>
  <div class="flex flex-col items-center justify-center pt-10 pb-20 w-full">
    <div class="space-y-5">
      <div>
        <p>Splits</p>
        <div v-html="barChart"></div>
      </div>

      <div>
        <p>Speed</p>
        <div v-html="speed"></div>
      </div>
      <div>
        <p>Heartrate</p>
        <div v-html="lineChart"></div>
      </div>
      <div>
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

const { splitsMetric, lapsMetric } = defineProps({
  splitsMetric: {
    type: Array as () => Splits[],
    required: true
  },
  lapsMetric: {
    type: Array as () => Lap[],
    required: true
  }
})
const lineChart = ref('')
const cadence = ref('')
const barChart = ref('')
const speed = ref('')

onMounted(() => {
  const distanceSplits = splitsMetric.map((split) => split.split - 1)

  const averageHR = { label: 'avg. HR', value: 140 } // this will vary
  const line = createLineChart(lapsMetric, distanceSplits, 'average_heartrate', averageHR)
  lineChart.value = line?.outerHTML || ''

  const cadenceLine = createLineChart(lapsMetric, distanceSplits, 'average_cadence')
  cadence.value = cadenceLine?.outerHTML || ''

  const paceLine = createLineChart(lapsMetric, distanceSplits, 'average_watts')
  speed.value = paceLine?.outerHTML || ''

  const bar = createBarChart(splitsMetric)
  barChart.value = bar?.outerHTML || ''
})
</script>

<style scoped></style>
