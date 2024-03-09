<template>
  <button
    @click="$emit('click')"
    class="flex justify-center items-center"
  >
    <slot name="left-icon"></slot>
    <p>
      {{ label }}
    </p>
    <slot name="right-icon"></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>
