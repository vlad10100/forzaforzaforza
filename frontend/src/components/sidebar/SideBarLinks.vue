<template>
  <div>
    <RouterLink
      v-slot="{ isActive }"
      :to="navlink.value"
    >
      <div
        class="h-8 w-full hover:bg-indigo-100 rounded-md flex gap-5 items-center flex-nowrap cursor-pointer relative"
      >
        <div
          class="h-8 w-1 bg-indigo-400 absolute -left-2"
          v-if="isActive"
        ></div>
        <div>
          <div
            class="h-8 w-8 rounded-md cursor-pointer"
            :class="navlink.style"
          ></div>
        </div>
        <p class="flex-grow-0 flex-shrink-0">{{ navlink.label }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  navlink: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped></style>
