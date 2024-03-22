<template>
  <Page>
    <div
      class="md:flex md:flex-row md:gap-10 w-full my-20 mb-60 justify-center"
      v-if="athlete"
    >
      <div>
        <div class="h-60 w-48 mx-auto md:mx-0 border border-gray-100 shadow-lg rounded-es-lg">USER</div>
        <p
          v-if="!athlete.connected_to_strava"
          class="text-black text-center py-4 hover:font-medium hover:text-yellow-500 cursor-pointer duration-300 ease-in-out"
          @click="connectToStrava"
        >
          connect to strava
        </p>
      </div>
      <div class="mx-auto md:mx-0 md:w-80 sm:w-96 w-4/5 space-y-2">
        <TextInput
          label="Username"
          v-model="athlete.username"
          @blur="blur('username')"
          :error-messages="usernameError.username"
        />
        <TextInput
          label="First name"
          v-model="athlete.first_name"
          @blur="blur('first_name')"
          :error-messages="firstNameError.first_name"
        />
        <TextInput
          label="Last name"
          v-model="athlete.last_name"
          @blur="blur('last_name')"
          :error-messages="lastNameError.last_name"
        />
        <div class="flex gap-3 justify-evenly">
          <Calendar
            class="w-full"
            v-model="athlete.birthday"
            label="Birthday"
            @blur="blur('birthday')"
            :error-messages="birthdayError.birthday"
            :get-difference="true"
            @get-difference="handleDateDifference"
          />
          <div class="w-full">
            <p>Age:</p>
            <p class="text-end text-sm py-2">{{ athlete.age || '-' }}</p>
          </div>
        </div>

        <div class="py-2">
          <p class="text-sm mb-1">Gender:</p>
          <div class="flex flex-wrap items-center justify-between">
            <div
              class="flex items-center gap-2 text-xs cursor-pointer"
              v-for="gender in GENDER"
              :key="gender.value"
              @click="selectGender(gender.value)"
            >
              <CheckBox
                size="extra_small"
                :isCheckbox="false"
                :checked="selectedGender === gender.value"
                borderStyle="circle"
              />
              <p>{{ gender.label }}</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <TextInput
            label="Height"
            suffix="cm"
            dividerRight
            v-model="athlete.height"
          >
            <template #suffix="{ suffix }">
              <p class="mx-5">{{ suffix }}</p>
            </template>
          </TextInput>
          <TextInput
            label="Weight"
            suffix="kg"
            dividerRight
            v-model="athlete.weight"
          >
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
import { computed, onMounted, ref, watchEffect, inject } from 'vue'

import { useCommonStore } from '@/stores/common'
import { useUserStore } from '@/stores/user'

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, alpha } from '@vuelidate/validators'
import { useUsernameValidation, useDateValidation, useValidationErrors, transformDate } from '@/composables/vuelidate'

// axios
import type { Axios } from 'axios'
const axios = inject('axios') as Axios

import Page from '@/views/layout/Page.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import CheckBox from '@/components/inputs/CheckBox.vue'
import Calendar from '@/components/inputs/Calendar.vue'

const GENDER = [
  { label: 'male', value: 'male' },
  { label: 'female', value: 'female' },
  { label: 'Non binary', value: 'non-binary' },
]

const commonStore = useCommonStore()
const userStore = useUserStore()

const athlete = ref()
const selectedGender = ref('')

onMounted(async () => {
  commonStore.loadingWholePage = true
  const { data } = await axios.get('/user')

  data.age = data.age === 0 ? null : data.age
  selectedGender.value = data?.gender
  athlete.value = data
  if (data.birthday) athlete.value.birthday = new Date(data.birthday)

  setTimeout(() => {
    commonStore.loadingWholePage = false
  }, 1000)
})

const rules = computed(() => {
  return {
    athlete: {
      username: {
        required: helpers.withMessage('This field is required.', required),
        useUsernameValidation: helpers.withMessage('Username contains invalid character.', useUsernameValidation),
        minLength: helpers.withMessage('This username must have at least 6 characters.', minLength(6)),
        maxLength: helpers.withMessage('This username has a maximum of 16 characters.', maxLength(16)),
      },
      first_name: {
        required: helpers.withMessage('This field is required.', required),
        alpha: helpers.withMessage('This field can contain only letters.', alpha),
      },
      last_name: {
        required: helpers.withMessage('This field is required.', required),
        alpha: helpers.withMessage('This field can contain only letters.', alpha),
      },
      birthday: {
        required: helpers.withMessage('This field is required.', required),
        useDateValidation: helpers.withMessage('Please input a valid date.', useDateValidation),
      },
    },
  }
})
const v$ = useVuelidate(rules, { athlete })

const blur = (field: string) => {
  v$.value.athlete[field].$touch()
}

const usernameError = computed((): { username: string } => useValidationErrors(v$.value.athlete.username.$errors))
const firstNameError = computed((): { first_name: string } => useValidationErrors(v$.value.athlete.first_name.$errors))
const lastNameError = computed((): { last_name: string } => useValidationErrors(v$.value.athlete.last_name.$errors))
const birthdayError = computed((): { birthday: string } => useValidationErrors(v$.value.athlete.birthday.$errors))

const saveChanges = async () => {
  v$.value.athlete.$touch()
  if (v$.value.athlete.$invalid) return
  try {
    commonStore.loadingWholePage = true
    const user = userStore.getUser()
    const { data } = await axios.post(`/user/${user?.user_id}`, athlete.value)
    userStore.loadUser(data.username, data.email, data.id)
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.loadingWholePage = false
  }
}

const connectToStrava = () => {
  console.log('connectToStrava')
}

const handleDateDifference = (date: { years: number; months: number; days: number }) => {
  const parsedAge = `${date.years} years, ${date.months} mo.`
  athlete.value.age = parsedAge
}

const selectGender = (gender: string) => {
  selectedGender.value = gender
  athlete.value.gender = gender
}
</script>

<style scoped></style>
