import { nextTick } from 'vue'
import { useCommonStore } from '@/stores/common'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const getSignedInUser = async() => {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null)
        }
      });
    });
    return user
  } catch (error) {
    console.error('Error in onAuthStateChanged:', error)
    // Handle error accordingly
  }
}


export { getSignedInUser }