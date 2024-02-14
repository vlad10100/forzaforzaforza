<template>
  <div ref="dropdown" class="cursor-pointer relative">
    <div @click="isVisible = !isVisible">
      <slot name="button"></slot>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        @click="isVisible = false"
        class="transition ease-in-out duration-200 absolute right-0 mt-2 z-10 origin-top-right rounded-md bg-white shadow-xl overflow-hidden"
        v-if="isVisible"
      >
        <slot name="dropdown-options"> </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isVisible = ref(false)
const dropdown = ref(null)
onClickOutside(dropdown, () => (isVisible.value = false))
</script>

<style scoped></style>
