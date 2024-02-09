<template>
  <div>ABOUT US</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  commonStore.isLoading = true
  setTimeout(() => {
    if (commonStore.isFetchingUser) return
    commonStore.isLoading = false
  }, 1000)
})
</script>

<style scoped></style>
