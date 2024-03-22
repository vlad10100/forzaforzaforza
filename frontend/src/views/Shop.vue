<template>
  <Page>
    <div class="h-screen flex justify-center mt-20">
      <div>
        <div class="flex gap-5 mb-10">
          <IcChevron
            direction="left"
            @click="goBack"
          />
          <p>{{ merch?.category }} (create Breadcrumbs)</p>
        </div>

        <div>
          <p>product name: {{ merch?.label }}</p>
        </div>

        <div>price: xxx</div>
        <div>merch id: {{ merch?.id }}</div>

        <div class="w-full flex justify-center">
          <img :src="`/singlets/${merch?.link}`" />
        </div>
        <div>
          <p>Buy Now</p>
          <p>Add to Cart</p>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Page from './layout/Page.vue'
import { useMerchendiseStore } from '@/stores/shop'
import IcChevron from '@/components/icons/IcChevron.vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()

onMounted(() => {
  commonStore.loadingWholePage = true
  setTimeout(() => {
    commonStore.loadingWholePage = false
  }, 1000)
})

type Merchendise = {
  id: Number
  category: String
  label: String
  link: String
  price: Number
}

const myStore = useMerchendiseStore()

const route = useRoute()
const router = useRouter()
const itemId = ref<number>(0)
const merch = ref<Merchendise | null>(null)

onMounted(() => {
  itemId.value = parseInt(route.params.id as string)

  const data = myStore.getMerchById(itemId.value)
  if (data) merch.value = data
})

const goBack = () => {
  console.log('vlad')
  router.go(-1)
}
</script>

<style scoped></style>
