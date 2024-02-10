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
          />
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TextInput from './TextInput.vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const date = ref(new Date())
const emit = defineEmits(['update:modelValue'])

const { label } = defineProps({
  label: { type: String }
})

watch(
  () => date.value,
  (newDate) => {
    emit('update:modelValue', newDate)
  }
)
</script>

<style scoped></style>
