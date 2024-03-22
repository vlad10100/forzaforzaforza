<template>
  <div class="md:flex w-full">
    <div class="fixed z-50 md:relative md:z-0">
      <SideBar
        v-if="userStore.user && userStore.user.connected_to_strava"
        @toggle="toggleSideBar"
        :is-side-bar-open="isSideBarOpen"
        :nav-links="NAVLINKS"
        :settings="SETTINGS"
        :user-data="userStore.user"
      ></SideBar>
    </div>

    <!-- INSET -->
    <div
      class="fixed inset-0 z-20 bg-white opacity-60"
      @click="smallScreen && isSideBarOpen ? (isSideBarOpen = false) : null"
      v-if="smallScreen && isSideBarOpen"
    />

    <!-- MAIN CONTENT -->
    <div class="flex w-full overflow-y-auto scrollbar max-h-[calc(100vh-64px)]">
      <div class="m-10 lg:mx-20 mx-5 w-full ml-20 md:ml-5">
        <div v-if="userStore.user && userStore.user.connected_to_strava">
          <div>
            <RouterView></RouterView>
          </div>
        </div>
        <div v-else>
          <ConnectNow />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useUserStore } from '@/stores/user'

import Loader from '@/components/common/Loader.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import ConnectNow from '@/views/app/ConnectNow.vue'
import { RouterView } from 'vue-router'

const { width } = useWindowSize()
const isSideBarOpen = ref(false)
const smallScreen = ref(false)

const userStore = useUserStore()

const NAVLINKS = [
  { label: 'Forza Events', value: '/app/forza-events', style: 'bg-violet-400' },
  { label: 'Activities', value: '/app/activities', style: 'bg-yellow-400' },
  { label: 'Training', value: '/app/training', style: 'bg-orange-400' },
  { label: 'Pace Calculator', value: '/app/pace-calculator', style: 'bg-pink-400' },
]

const SETTINGS = [
  { label: 'Settings', value: 'link-s', style: 'bg-yellow-400' },
  { label: 'Notifications', value: 'link-a', style: 'bg-orange-400' },
  { label: 'Log out', value: 'link-b', style: 'bg-pink-400' },
]

const toggleSideBar = () => {
  isSideBarOpen.value = !isSideBarOpen.value
}

onMounted(async () => {
  if (width.value < 768) {
    smallScreen.value = true
  } else smallScreen.value = false
})

watch(
  () => width.value,
  newVal => {
    if (newVal < 768) {
      smallScreen.value = true
    } else smallScreen.value = false
  },
)
</script>

<style scoped></style>
