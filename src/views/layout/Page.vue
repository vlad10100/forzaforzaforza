<template>
  <div>
    <slot></slot>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/common/Footer.vue'

// Scroll to top
document.body.scrollTop = 0
document.documentElement.scrollTop = 0
</script>

<style scoped></style>
