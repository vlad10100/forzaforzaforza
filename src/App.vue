<template>
  <div class="overflow-hidden relative">
    <NavBar ref="navBar" />

    <div class="overflow-y-auto scrollbar fixed w-full top-16" :class="navBarHeight">
      <RouterView />
      <div class="fixed inset-0 bg-white z-50 bg-opacity-75 top-16" v-if="commonStore.isLoading">
        <div class="h-full flex items-center justify-center">
          <Loader size="200" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useCommonStore } from './stores/common'
import NavBar from './components/common/Navbar.vue'
import Loader from './components/common/Loader.vue'
import { getSignedInUser } from '@/composables'
import { useAthleteStore } from './stores/athlete'

const navBar = ref(null)
const commonStore = useCommonStore()
const athleteStore = useAthleteStore()
const { height } = useElementSize(navBar)

onMounted(async () => {
  commonStore.isFetchingUser = true
  const user = await getSignedInUser()
  if (!user) {
    commonStore.isFetchingUser = false
    commonStore.isLoading = false
    return
  }
  commonStore.signedInUser = user
  const athlete = await athleteStore.loadAthlete(commonStore.signedInUser.uid)
  commonStore.signedInUser['connected_to_strava'] = athlete?.connected_to_strava || false
  commonStore.isFetchingUser = false
})

const navBarHeight = computed(() => {
  if (height.value < 100) {
    return 'h-[calc(100vh-64px)]'
  }
  return 'h-[calc(100vh-498px)]'
})
</script>

<style scoped></style>
