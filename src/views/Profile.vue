<template>
  <div>
    <div>ATHLETE</div>
    <div v-if="athlete">
      <p>username: {{ athlete.username }}</p>
      <p>first name: {{ athlete.first_name }}</p>
      <p>last name: {{ athlete.last_name }}</p>
      <p>age: {{ athlete.age }}</p>
      <p>gender: {{ athlete.gender }}</p>
      <p>height: {{ athlete.height }}</p>
      <p>weight: {{ athlete.weight }}</p>
      <p v-if="!athlete.connected_to_strava" class="text-yellow-600">connect to strava</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useAthleteStore } from '@/stores/athlete'
import { useCommonStore } from '@/stores/common'

const athleteStore = useAthleteStore()
const commonStore = useCommonStore()

const athlete = ref()

watchEffect(async () => {
  if (!commonStore.isFetchingUser) {
    commonStore.isLoading = true
    if (!commonStore.signedInUser) {
      commonStore.isLoading = false
      return
    }
    athlete.value = await athleteStore.loadAthlete(commonStore.signedInUser.uid)
    commonStore.isLoading = false
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
