import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('commonStore', () => {
  const loadingWholePage = ref(false)

  return { loadingWholePage }
})
