<template>
  <div class="overflow-hidden">
    <NavBar ref="navBar" />

    <div class="overflow-y-auto scrollbar absolute w-full top-16" :class="navBarHeight">
      <RouterView />
      <div class="fixed inset-0 bg-white z-50 bg-opacity-75 top-16" v-if="store.isLoading">
        <div class="h-full flex items-center justify-center">
          <Loader size="200" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useCommonStore } from './stores/common'
import NavBar from './components/common/Navbar.vue'
import Loader from './components/common/Loader.vue'

const navBar = ref(null)
const store = useCommonStore()
const { height } = useElementSize(navBar)

const navBarHeight = computed(() => {
  if (height.value < 100) {
    return 'h-[calc(100vh-64px)]'
  }
  return 'h-[calc(100vh-498px)]'
})
</script>

<style scoped></style>
