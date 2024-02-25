<template>
  <div>
    <div
      class="h-8 w-full hover:bg-indigo-100 rounded-md flex gap-5 items-center flex-nowrap cursor-pointer relative"
    >
      <div class="h-8 w-1 bg-indigo-400 absolute -left-2" v-if="isSelected"></div>
      <div>
        <div class="h-8 w-8 rounded-md cursor-pointer" :class="navlink.style"></div>
      </div>
      <p class="flex-grow-0 flex-shrink-0">{{ navlink.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// type NavLinkType = {
//   label: string
//   value: string | number
//   style: string
// }

defineProps({
  navlink: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
