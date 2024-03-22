<template>
  <Page>
    <div class="h-screen">SHOP</div>
  </Page>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useCommonStore } from '@/stores/common'
import Page from './layout/Page.vue'

const commonStore = useCommonStore()

onMounted(() => {
  commonStore.loadingWholePage = true
  setTimeout(() => {
    commonStore.loadingWholePage = false
  }, 1000)
})
</script>

<style scoped></style>
