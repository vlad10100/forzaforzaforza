<template>
  <div class="flex w-full mt-52 justify-center">
    <div class="text-center space-y-6 max-w-60">
      <img
        class="h-5 mx-auto"
        src="/logo/forza_logo.svg"
      />
      <div>
        <p class="font-light">Welcome to</p>
        <p class="text-xl">forzaforzaforza.com</p>
      </div>

      <div class="space-y-2">
        <p class="text-xs font-light">Log in or sign up with Google.</p>
        <GoogleLogin
          :callback="callback"
          prompt
          auto-login
        ></GoogleLogin>
        <p
          v-if="invalidEmail"
          class="text-xs text-red-400"
        >
          Invalid email. Please try again.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { GoogleLogin, decodeCredential } from 'vue3-google-login'

// stores
import { useCommonStore } from '@/stores/common'
import { useUserStore } from '@/stores/user'

// router
import { useRouter } from 'vue-router'

// axios
import type { Axios } from 'axios'
const axios = inject('axios') as Axios

type Response = {
  clientId: string
  client_id: string
  credential: string
  select_by: string
}

type Credentials = {
  email: string
  email_verified: Boolean
  exp: number
  family_name: string
  given_name: string
  name: string
  sub: string
}

const router = useRouter()
const commonStore = useCommonStore()
const userStore = useUserStore()

const invalidEmail = ref(false)

const callback = async (response: Response) => {
  const credentials = decodeCredential(response.credential) as Credentials
  if (!credentials.email_verified) {
    invalidEmail.value = true
    setTimeout(() => (invalidEmail.value = false), 2000)
    return
  }

  try {
    commonStore.loadingWholePage = true
    const { data } = await axios.post('/auth', { google_user_id: credentials.sub, email: credentials.email })

    // set the signed in user
    userStore.loadUser(data.user.username, data.user.email, data.user.id, data.user.connected_to_strava)

    if (data.new_user) {
      router.push('/profile')
      return
    }
    router.push('/run')
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.loadingWholePage = false
  }
}
</script>

<style scoped></style>
