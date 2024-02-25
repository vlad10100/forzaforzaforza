<template>
  <div>
    <div
      class="h-[calc(100vh-80px)] transition-all duration-150 ease-linear relative"
      :class="isSideBarOpen ? 'w-60' : 'w-16'"
    >
      <div class="absolute -right-3 flex items-center h-full">
        <div
          class="h-6 w-1 rounded-full bg-gray-400 hover:bg-black m-2 cursor-pointer"
          @click="$emit('toggle')"
        ></div>
      </div>

      <!-- USER TAB -->
      <div
        class="h-40 border border-gray-200 bg-white rounded-md mx-1 my-2 p-3 flex flex-col gap-3 overflow-hidden shadow-md"
      >
        <div>
          <div @click="$emit('toggle')">
            <IcSquares
              v-if="!isSideBarOpen"
              class="mx-auto cursor-pointer text-gray-400"
              direction="right"
            />
          </div>
          <div class="flex justify-end" v-if="isSideBarOpen" @click="$emit('toggle')">
            <IcChevron direction="left" class="text-gray-400 cursor-pointer"> </IcChevron>
          </div>
        </div>
        <div class="h-8 w-full bg-slate-50 rounded-md flex gap-5 items-center flex-nowrap">
          <div>
            <div class="h-8 w-8 bg-black rounded-md cursor-pointer"></div>
          </div>
          <p class="flex-grow-0 flex-shrink-0">USER</p>
        </div>
      </div>

      <div
        class="h-[calc(100vh-250px)] border bg-white border-gray-200 rounded-md mx-1 my-2 shadow-md flex flex-col justify-between"
      >
        <div
          class="max-h-[calc(100vh-420px)] h-full scrollbar"
          :class="isSideBarOpen ? 'overflow-y-auto' : 'overflow-hidden'"
        >
          <div class="p-3 overflow-hidden space-y-3">
            <SideBarLinks
              v-for="(navlink, index) in navLinks"
              @click="selectNavLink(navlink.value)"
              :key="index"
              :navlink="navlink"
              :is-selected="selectedNavLink === navlink.value"
            ></SideBarLinks>
          </div>
        </div>
        <hr />

        <div class="p-3 overflow-hidden space-y-3">
          <SideBarLinks
            v-for="(navlink, index) in settings"
            @click="selectNavLink(navlink.value)"
            :key="index"
            :navlink="navlink"
            :is-selected="selectedNavLink === navlink.value"
          ></SideBarLinks>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IcChevron from '@/components/icons/IcChevron.vue'
import IcSquares from '@/components/icons/IcSquares.vue'
import SideBarLinks from '@/components/sidebar/SideBarLinks.vue'
import { ref, onMounted } from 'vue'

const NAV_LINK_KEY = 'NAV_LINK_KEY'
const selectedNavLink = ref('')
type NavLink = { label: string; value: string }

defineProps({
  isSideBarOpen: {
    type: Boolean,
    default: false
  },
  navLinks: {
    type: Array as () => NavLink[],
    required: true
  },
  settings: {
    type: Array as () => NavLink[],
    required: true
  }
})

const selectNavLink = (navlink: string) => {
  selectedNavLink.value = navlink
  localStorage.setItem(NAV_LINK_KEY, selectedNavLink.value)
}
onMounted(() => {
  const navlink = localStorage.getItem(NAV_LINK_KEY)
  if (!navlink) return
  selectedNavLink.value = navlink
})
</script>

<style scoped></style>
