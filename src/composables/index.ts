import { nextTick } from 'vue'
import { useCommonStore } from '@/stores/common'

const useLoading = () => {
  const store = useCommonStore()

  store.isLoading = true
  nextTick(() => {
    setTimeout(() => {
      store.changeLoadingStatus()
    }, 1000)
  })

}

export { useLoading }