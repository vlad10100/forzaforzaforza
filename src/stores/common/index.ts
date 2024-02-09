import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('commonStore', () => {
  const isLoading = ref(false)
  const changeLoadingStatus = () => {
    isLoading.value = !isLoading.value
  }

  return { isLoading, changeLoadingStatus }
})
