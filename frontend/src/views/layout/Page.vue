<template>
  <div>
    <!-- LOADING -->
    <div
      class="fixed inset-0 bg-white z-50 bg-opacity-75 top-16"
      v-if="commonStore.loadingWholePage"
    >
      <div class="h-full flex items-center justify-center">
        <Loader size="200" />
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <slot></slot>

    <!-- FOOTER -->
    <Footer v-if="!commonStore.loadingWholePage" />
  </div>
</template>

<script setup lang="ts">
import Loader from '@/components/common/Loader.vue'
import Footer from '@/components/common/Footer.vue'
import { useCommonStore } from '@/stores/common'
import { onMounted } from 'vue'

const commonStore = useCommonStore()

onMounted(() => {
  // Scroll to top
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})
</script>

<style scoped></style>
