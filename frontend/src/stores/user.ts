import { defineStore } from 'pinia'

export const USER_KEY = 'forza_user'

export type User = {
  username: string | null
  email: string
  user_id: string
}

export const useUserStore = defineStore('userStore', () => {
  const loadUser = (username: string, email: string, user_id: string) => {
    const user: User = { username, email, user_id }
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  const getUser = () => {
    const user = localStorage.getItem(USER_KEY)
    if (user) {
      return JSON.parse(user)
    }
    return null
  }

  const removeUser = () => {
    localStorage.removeItem(USER_KEY)
  }

  return { loadUser, getUser, removeUser }
})
