<template>
  <div class="w-full h-40 bg-gray-100 rounded-md p-10 my-20">
    <p>Connect your Strava to continue...</p>
    <BaseButton
      class="bg-yellow-400 py-1 px-3 my-2 rounded-md"
      @click="connectNow"
      label="Connect Now"
    ></BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'

const connectNow = () => {
  window.location.href =
    'https://www.strava.com/oauth/authorize?client_id=116994&response_type=code&redirect_uri=http://forzaforzaforza.com/beta/forza-strava-auth&approval_prompt=force&scope=profile:read_all,activity:read_all'
}
</script>

<style scoped></style>
