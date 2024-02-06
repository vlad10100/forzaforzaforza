<template>
  <Page>
    <div class="h-screen">
      <p>
        {{ sport }}
      </p>
      <p>{{ category }}</p>
      <p>{{ productType }}</p>
      <p>{{ itemId }}</p>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Page from './layout/Page.vue'

const route = useRoute()
const sport = ref<string>('')
const category = ref<string>('')
const productType = ref<string>('')
const itemId = ref<number>(0)

onMounted(() => {
  sport.value = route.params.sport as string
  productType.value = route.params.productType as string
  category.value = route.params.category as string
  itemId.value = parseInt(route.params.id as string)
})
</script>

<style scoped></style>
