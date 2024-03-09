<template>
  <div
    @click="$emit('view-detail')"
    class="md:w-60 h-full relative rounded-lg p-2 border border-gray-50 shadow-sm hover:border-gray-100 hover:shadow-md cursor-pointer duration-150 ease-in-out mx-auto"
  >
    <img
      class="w-fit h-60 mx-auto object-contain"
      :src="`/singlets/${source}`"
    />
    <div class="w-full px-5 text-sm pb-8">
      <h4 class="">{{ label }}</h4>
    </div>
    <div class="absolute bottom-0 right-5 p-2">
      <p v-if="!price">Sold Out</p>
      <p
        v-else
        class="text-right"
      >
        ₱ xxx
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped></style>
