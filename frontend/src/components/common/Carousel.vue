<template>
  <div class="relative w-full">
    <div class="overflow-hidden" ref="emblaRef">
      <div class="flex">
        <slot name="slides" :slides="slides">
          <div
            class="flex-grow-0 h-96 flex-shrink-0 w-full p-2"
            v-for="slide in slides"
            :key="slide.value"
          >
            <div class="h-full w-full rounded-lg overflow-hidden" :class="slide.value"></div>
          </div>
        </slot>
      </div>
    </div>
    <div>
      <slot name="slide-buttons">
        <div class="flex gap-3 justify-center w-full absolute bottom-5">
          <div
            @click="scrollTo(index)"
            v-for="(slide, index) in slides"
            :key="slide.value"
            class="h-1 w-4 rounded-full duration-500 ease-in-out"
            :class="currentSlide === index ? 'bg-black' : 'bg-gray-100'"
          ></div>
        </div>
      </slot>
    </div>

    <div v-if="!noArrows">
      <slot name="prev-button">
        <div
          @click="prev"
          class="absolute top-0 left-0 flex h-full items-center text-slate-300 hover:text-slate-500 duration-150 ease-in-out"
        >
          <ChevronIcon direction="left" size="40" />
        </div>
      </slot>
      <slot name="next-button">
        <div
          @click="next"
          class="absolute top-0 right-0 flex h-full items-center text-slate-300 hover:text-slate-500 duration-150 ease-in-out"
        >
          <ChevronIcon direction="right" size="40" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { EmblaCarouselType } from 'embla-carousel'
import type { AutoplayType } from 'embla-carousel-autoplay'

import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import ChevronIcon from '@/components/icons/IcChevron.vue'

type slideType = {
  label: string
  value: string
  link: string
}
const { slides } = defineProps({
  slides: {
    type: Array<slideType>,
    required: true
  },
  noArrows: {
    type: Boolean,
    default: false
  }
})

const currentSlide = ref(0)

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true }, [Autoplay({ delay: 4000 })])

watchEffect(() => {
  if (emblaApi.value) {
    emblaApi.value.on('select', (emblaApi: EmblaCarouselType) => {
      currentSlide.value = emblaApi.selectedScrollSnap()
      const { autoplay }: AutoplayType = emblaApi.plugins()
      if (!autoplay) return
      autoplay.play()
    })
  }
})

const prev = () => {
  emblaApi.value?.scrollPrev()
  currentSlide.value = emblaApi.value?.selectedScrollSnap() || 0
}

const next = () => {
  emblaApi.value?.scrollNext()
  currentSlide.value = emblaApi.value?.selectedScrollSnap() || 0
}

const scrollTo = (slide: number) => {
  emblaApi.value?.scrollTo(slide)
  currentSlide.value = slide
}
</script>

<style scoped></style>
