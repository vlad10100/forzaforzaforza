<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// axios
import type { Axios } from 'axios'
const axios = inject('axios') as Axios

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const _2023 = 1640966400
const _2024 = 1704038400 // start of 2024
const _2025 = 1735660800 // end of 2024

onMounted(async () => {
  const code = route.query.code
  // send code to save the refresh token
  try {
    const { data } = await axios.post('strava/auth', { code })
    userStore.loadUser(data.user.username, data.user.email, data.user.id, data.user.connected_to_strava)

    // save user activities
    await axios.post(`/strava/activities/${_2023}/${_2024}`)
    await axios.post(`/strava/activities/${_2024}/${_2025}`)
  } catch (error) {
    return console.log('stravaConnection error')
  } finally {
    router.push('/run')
  }
})
</script>

<style scoped></style>
