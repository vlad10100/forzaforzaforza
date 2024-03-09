<template>
  <div>
    <GoogleLogin
      :callback="callback"
      prompt
      auto-login
    ></GoogleLogin>
  </div>
</template>

<script setup lang="ts">
import { GoogleLogin, decodeCredential } from 'vue3-google-login'

type Response = {
  clientId: string
  client_id: string
  credential: string
  select_by: string
}

const callback = async (response: Response) => {
  console.log('Handle the response', decodeCredential(response.credential))
}
</script>

<style scoped></style>
