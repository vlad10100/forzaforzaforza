<template>
  <div>
    <div>ATHLETE</div>
    <div v-if="athlete">
      <p>username: {{ athlete.username }}</p>
      <p>first name: {{ athlete.first_name }}</p>
      <p>last name: {{ athlete.last_name }}</p>
      <p>age: {{ athlete.age }}</p>
      <p>gender: {{ athlete.gender }}</p>
      <p>height: {{ athlete.height }}</p>
      <p>weight: {{ athlete.weight }}</p>
      <p v-if="!athlete.connected_to_strava" class="text-yellow-600">connect to strava</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { useCommonStore } from '../stores/common'

const store = useCommonStore()
const athlete = ref()

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return
    store.isLoading = true
    const currentAthlete = await getCurrentAthlete(user.uid)
    athlete.value = currentAthlete
    store.changeLoadingStatus()
  })
})

const getCurrentAthlete = async (id: string) => {
  if (!id) return
  const athleteDoc = doc(db, 'athletes', id)
  const resp = await getDoc(athleteDoc)
  return resp.data()
}
</script>

<style scoped></style>
