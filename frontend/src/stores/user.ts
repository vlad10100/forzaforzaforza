import { ref } from 'vue'
import { defineStore } from 'pinia'

export const USER_KEY = 'forza_user'

export type User = {
  username: string | null
  email: string
  user_id: string
  connected_to_strava: boolean
}

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)

  const loadUser = (username: string, email: string, user_id: string, connected_to_strava: boolean = false) => {
    const userObject: User = { username, email, user_id, connected_to_strava }
    user.value = userObject
    localStorage.setItem(USER_KEY, JSON.stringify(userObject))
  }

  const getUser = () => {
    const savedUser = localStorage.getItem(USER_KEY)
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      return user.value
    }
    return null
  }

  const removeUser = () => {
    localStorage.removeItem(USER_KEY)
    user.value = null
  }

  return { loadUser, getUser, removeUser, user }
})
