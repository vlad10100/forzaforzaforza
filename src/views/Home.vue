<template>
  <div class="flex my-20 mb-60">
    <div class="sm-10 lg:mx-20 mx-5 w-full space-y-10">
      <!-- CAROUSEL -->
      <div class="w-full mt-5">
        <Carousel :slides="carouselSlides" class="h-full w-full cursor-pointer">
          <template #slides="{ slides }">
            <div
              class="flex-grow-0 h-[500px] flex-shrink-0 w-full p-2"
              v-for="(slide, index) in slides"
              :key="index"
            >
              <div class="h-full w-full rounded-lg overflow-hidden" :class="slide.value">
                <div class="h-full w-full flex items-center justify-center">
                  <img class="w-auto max-h-full" :src="`/logo/${slide.link}`" />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>

      <!-- SINGLETS -->
      <div>
        <h1 class="text-2xl my-5">FORZA Singlets</h1>
        <div class="grid lg:grid-cols-3 grid-cols-2 gap-10 lg:mx-32 md:mx-20">
          <div v-for="singlet in singlets" :key="singlet.value">
            <div
              class="w-auto mx-auto rounded-lg p-2 border border-gray-50 shadow-sm hover:border-gray-100 hover:shadow-md cursor-pointer duration-150 ease-in-out"
            >
              <img class="w-fit h-60 mx-auto object-contain" :src="`/singlets/${singlet.link}`" />
              <div class="w-full px-5">
                <h1>{{ singlet.label }}</h1>
                <p class="text-right">₱ {{ singlet.value.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
const carouselSlides = [
  { label: 'SLIDE 1', value: 'bg-gray-100', link: 'forza.svg' },
  { label: 'SLIDE 2', value: 'bg-gray-200', link: 'forzaforzaforza.svg' },
  { label: 'SLIDE 5', value: 'bg-gray-100', link: 'violet-forza.svg' },
  { label: 'SLIDE 5', value: 'bg-gray-200', link: 'green-forza.svg' },
  { label: 'SLIDE 5', value: 'bg-gray-200', link: 'outline-forza.svg' }
]

const singlets = [
  { label: 'Forza - Black Singlet', value: 1300, link: 'black-singlet.png' },
  { label: 'Forza - Pink-Green Singlet', value: 1500, link: 'pink-singlet.png' },
  { label: 'Forza - Black-Red Singlet', value: 1500, link: 'red-singlet.png' },
  { label: 'Forza - Black-Violet Singlet', value: 1500, link: 'violet-singlet.png' },
  { label: 'Forza - White Singlet', value: 1300, link: 'white-singlet.png' },
  { label: 'Forza - Black-Teal Singlet', value: 1500, link: 'teal-singlet.png' }
]
</script>

<style scoped></style>
