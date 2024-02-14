<template>
  <div>SALE</div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()
watchEffect(() => {
  if (!commonStore.isFetchingUser) {
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
