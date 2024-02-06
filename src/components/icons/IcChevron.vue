<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :width="size"
    :height="size"
    :class="mapDirections[direction]"
    @click="emit('click')"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const emit = defineEmits(['click'])

const { size } = defineProps({
  size: { type: String || Number, default: '24' },
  direction: { type: String as PropType<'right' | 'left' | 'up' | 'down'>, default: 'down' }
})

const mapDirections = {
  up: '-rotate-180',
  down: 'rotate-0',
  left: 'rotate-90',
  right: '-rotate-90'
}
</script>

<style scoped></style>
