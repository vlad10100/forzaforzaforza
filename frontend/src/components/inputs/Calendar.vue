<template>
  <div>
    <DatePicker v-model="date" color="gray">
      <template v-slot="{ inputValue, inputEvents }">
        <div class="space-y-2">
          <TextInput
            name="date-input"
            :label="label"
            v-on="inputEvents"
            :model-value="inputValue"
            @blur="$emit('blur')"
            :error-messages="errorMessages"
          />
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, watchEffect } from 'vue'
import TextInput from './TextInput.vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const emit = defineEmits(['update:modelValue', 'blur', 'get-difference'])

const { label, errorMessages, getDifference, modelValue } = defineProps({
  label: { type: String },
  errorMessages: { type: String },
  getDifference: { type: Boolean, default: false },
  modelValue: { type: Date }
})

const date = ref(new Date())

watchEffect(() => {
  if (!modelValue) return
  date.value = modelValue
})

const getDateDifference = (date1: Date, date2: Date) => {
  const difference = date2.getTime() - date1.getTime()
  const differenceDate = new Date(difference)
  const years = differenceDate.getUTCFullYear() - 1970
  const months = differenceDate.getUTCMonth()
  const days = differenceDate.getUTCDate() - 1

  return { years, months, days }
}

watch(
  () => date.value,
  (newDate) => {
    emit('update:modelValue', newDate)

    if (!getDifference) return
    const difference = getDateDifference(newDate, new Date())
    emit('get-difference', difference)
  }
)
</script>

<style scoped></style>
