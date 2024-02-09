<template>
  <div>CALENDAR</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoading } from '@/composables'

onMounted(() => {
  useLoading()
})
</script>

<style scoped></style>
