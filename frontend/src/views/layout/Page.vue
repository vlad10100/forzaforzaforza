<template>
  <div>
    <slot></slot>
    <Footer v-if="!commonStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/common/Footer.vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()

// Scroll to top
document.body.scrollTop = 0
document.documentElement.scrollTop = 0
</script>

<style scoped></style>
