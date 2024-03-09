<template>
  <div class="overflow-hidden relative">
    <NavBar />
    <div class="overflow-y-auto scrollbar fixed w-full top-16 main-container">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/common/Navbar.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})
</script>

<style scoped>
.main-container {
  height: calc(100vh - 64px);
}
</style>
