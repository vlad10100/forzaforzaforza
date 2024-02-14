import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export const useCommonStore = defineStore('commonStore', () => {
  const isLoading = ref(false)
  const isFetchingUser = ref(false)

  const signedInUser = ref()

  const loadSignedInUser = async () => {
    if (!signedInUser.value) {
      onAuthStateChanged(auth, async (user) => {
        signedInUser.value = user
        return signedInUser.value
      })
    }
    return signedInUser.value
  }

  return { isLoading, isFetchingUser, signedInUser, loadSignedInUser }
})
