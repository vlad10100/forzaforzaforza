<template>
  <Page>
    <div class="md:flex md:flex-row md:gap-10 w-full my-20 mb-60 justify-center" v-if="athlete">
      <div>
        <div class="h-60 w-48 mx-auto md:mx-0 border border-gray-100 shadow-lg rounded-es-lg">
          USER
        </div>
        <p
          v-if="athlete.connected_to_strava"
          class="text-black text-center py-4 hover:font-medium hover:text-yellow-500 cursor-pointer duration-300 ease-in-out"
          @click="connectToStrava"
        >
          connect to strava
        </p>
      </div>
      <div class="mx-auto md:mx-0 md:w-80 sm:w-96 w-4/5 space-y-2">
        <TextInput label="Username" v-model="athlete.username" />
        <TextInput label="First name" v-model="athlete.first_name" />
        <TextInput label="Lase name" v-model="athlete.last_name" />
        <TextInput label="Age" v-model="athlete.age" />

        <div class="py-2">
          <p class="text-sm mb-1">Gender:</p>
          <div class="flex flex-wrap items-center justify-between">
            <div
              class="flex items-center gap-2 text-xs"
              v-for="gender in GENDER"
              :key="gender.value"
              @click="selectedGender = gender.value"
            >
              <p>{{ gender.label }}</p>
              <CheckBox
                :isCheckbox="false"
                :checked="selectedGender === gender.value"
                borderStyle="circle"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <TextInput label="Height" suffix="cm" dividerRight v-model="athlete.height">
            <template #suffix="{ suffix }">
              <p class="mx-5">{{ suffix }}</p>
            </template>
          </TextInput>
          <TextInput label="Weight" suffix="kg" dividerRight v-model="athlete.weight">
            <template #suffix="{ suffix }">
              <p class="mx-5">{{ suffix }}</p>
            </template>
          </TextInput>
        </div>

        <div class="w-full text-center py-10">
          <button
            class="px-5 py-2 rounded-full border border-gray-100 hover:shadow-md bg-white hover:bg-yellow-400 duration-300 ease-in-out"
            @click="saveChanges"
          >
            <p>Save Changes</p>
          </button>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useAthleteStore } from '@/stores/athlete'
import { useCommonStore } from '@/stores/common'
import Page from './layout/Page.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import CheckBox from '@/components/inputs/CheckBox.vue'
import { useRouter } from 'vue-router'

const GENDER = [
  { label: 'male', value: 'male' },
  { label: 'female', value: 'female' },
  { label: 'Non binary', value: 'non-binary' }
]

const athleteStore = useAthleteStore()
const commonStore = useCommonStore()
const router = useRouter()

const athlete = ref()
const selectedGender = ref('')

watchEffect(async () => {
  if (!commonStore.isFetchingUser) {
    commonStore.isLoading = true
    if (!commonStore.signedInUser) {
      commonStore.isLoading = false
      return
    }
    const data = await athleteStore.loadAthlete(commonStore.signedInUser.uid)
    if (!data) {
      router.push('/')
      return
    }
    data.weight = data.weight === 0 ? null : data.weight
    data.height = data.height === 0 ? null : data.height
    data.age = data.age === 0 ? null : data.age
    athlete.value = data
    commonStore.isLoading = false
  }
})

onMounted(() => {
  commonStore.isLoading = true
  setTimeout(() => {
    if (commonStore.isFetchingUser) return
    commonStore.isLoading = false
  }, 1000)
})

const saveChanges = () => {
  console.log(athlete.value.username)
}

const connectToStrava = () => {
  console.log('connectToStrava')
}
</script>

<style scoped></style>
