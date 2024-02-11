<template>
  <Page>
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
                    <img class="w-auto max-h-full" :src="`/forza/logo/${slide.link}`" />
                  </div>
                </div>
              </div>
            </template>
          </Carousel>
        </div>

        <!-- SINGLETS -->
        <div>
          <h1 class="text-2xl my-5">FORZA Singlets</h1>
          <div class="grid lg:grid-cols-3 grid-cols-2 gap-10 lg:mx-20 md:mx-20">
            <ItemCard
              v-for="singlet in singlets"
              :key="singlet.id"
              :label="singlet.label"
              :source="singlet.link"
              @view-detail="viewDetail(singlet.id, singlet.category)"
            />
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import ItemCard from '@/components/shop/ItemCard.vue'
import Page from './layout/Page.vue'
import router from '@/router'

import { onMounted, watchEffect } from 'vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()
watchEffect(() => {
  if (!commonStore.isFetchingUser) {
    commonStore.isLoading = false
  }
})
onMounted(() => {
  commonStore.isLoading = true
  setTimeout(() => {
    if (commonStore.isFetchingUser) return
    commonStore.isLoading = false
  }, 1000)
})

const carouselSlides = [
  { label: 'SLIDE 1', value: 'bg-gray-100', link: 'forza.svg' },
  { label: 'SLIDE 2', value: 'bg-gray-200', link: 'forzaforzaforza.svg' },
  { label: 'SLIDE 5', value: 'bg-gray-100', link: 'violet-forza.svg' },
  { label: 'SLIDE 5', value: 'bg-gray-200', link: 'green-forza.svg' },
  { label: 'SLIDE 5', value: 'bg-gray-200', link: 'outline-forza.svg' }
]

const singlets = [
  {
    id: 1,
    category: 'run/clothes/top',
    label: 'Forza - Black Singlet',
    price: 1300,
    link: 'black-singlet.png'
  },
  {
    id: 2,
    category: 'run/clothes/top',
    label: 'Forza - Pink-Green Singlet',
    price: 1500,
    link: 'pink-singlet.png'
  },
  {
    id: 3,
    category: 'run/clothes/top',
    label: 'Forza - Black-Red Singlet',
    price: 1500,
    link: 'red-singlet.png'
  },
  {
    id: 4,
    category: 'run/clothes/top',
    label: 'Forza - Black-Violet Singlet',
    price: 1500,
    link: 'violet-singlet.png'
  },
  {
    id: 5,
    category: 'run/clothes/top',
    label: 'Forza - White Singlet',
    price: 1300,
    link: 'white-singlet.png'
  },
  {
    id: 6,
    category: 'run/clothes/top',
    label: 'Forza - Black-Teal Singlet',
    price: 1500,
    link: 'teal-singlet.png'
  }
]

const viewDetail = (id: Number, category: String) => {
  const url = `/shop/${category}/${id}`
  router.push(url)
}
</script>

<style scoped></style>
