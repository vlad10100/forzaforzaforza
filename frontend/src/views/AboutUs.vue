<template>
  <Page>
    <div class="h-screen">ABOUT US</div>
  </Page>
</template>

<script setup lang="ts">
import Page from './layout/Page.vue'
import { onMounted, watchEffect } from 'vue'
import { useCommonStore } from '@/stores/common'
const commonStore = useCommonStore()

onMounted(() => {
  commonStore.loadingWholePage = true
  setTimeout(() => {
    commonStore.loadingWholePage = false
  }, 1000)
})
</script>

<style scoped></style>
