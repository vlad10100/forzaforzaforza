<template>
  <div class="overflow-hidden">
    <NavBar ref="navBar" />

    <div class="overflow-y-auto scrollbar absolute w-full top-16" :class="navBarHeight">
      <RouterView />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import NavBar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'

const navBar = ref(null)
const { height } = useElementSize(navBar)

const navBarHeight = computed(() => {
  if (height.value < 100) {
    return 'h-[calc(100vh-64px)]'
  }
  return 'h-[calc(100vh-498px)]'
})
</script>

<style scoped></style>
