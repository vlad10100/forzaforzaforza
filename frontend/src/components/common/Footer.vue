<template>
  <div class="md:h-60 w-full bg-gray-100 relative">
    <div class="md:-rotate-90 md:absolute md:-left-10 md:bottom-18 p-10">
      <img class="w-44 h-auto" src="/logo/forza_logo.svg" />
    </div>
    <div class="md:flex md:justify-evenly md:space-y-0 md:pt-16 md:pb-0 p-10 space-y-10 pb-40">
      <div>
        <h3 class="text-xl font-medium">Customer Care</h3>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Return Policy</p>
        <p>Send a Return Request</p>
      </div>
      <div>
        <h3 class="text-xl font-medium">Information</h3>
        <p>About Us</p>
        <p>Contact Us</p>
        <p>FAQs</p>
      </div>
      <div>
        <h3 class="text-xl font-medium">Follow us</h3>
        <div class="flex gap-3 items-center my-3">
          <IcFacebook />
          <IcInstagram />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IcFacebook from '../icons/socialmedia/IcFacebook.vue'
import IcInstagram from '../icons/socialmedia/IcInstagram.vue'
</script>

<style scoped></style>
