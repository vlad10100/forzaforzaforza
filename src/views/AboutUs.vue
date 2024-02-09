<template>
  <div>ABOUT US</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()
onMounted(() => {
  commonStore.isLoading = true
  setTimeout(() => {
    if (commonStore.isFetchingUser) return
    commonStore.isLoading = false
  }, 1000)
})
</script>

<style scoped></style>
