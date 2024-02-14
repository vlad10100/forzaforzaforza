<template>
  <div class="space-y-1">
    <!-- INPUT LABEL -->
    <div>
      <p class="text-sm">{{ label }}</p>
      <p class="text-xs font-light">{{ info }}</p>
    </div>
    <!-- INPUT CONTAINER -->
    <div
      class="border flex items-center bg-white rounded-md duration-300 ease-in-out"
      :class="[
        {
          'ring-black border-black ring-1': inputState.focus
        },
        { '!border-red-500': inputState.error },
        { '!ring-red-500 ring-1': inputState.focus && inputState.error }
      ]"
    >
      <!-- TEXTAREA -->
      <textarea
        class="w-full py-2 px-3 text-xs rounded-md scrollbar outline-none"
        :class="{ 'resize-none': !resizable }"
        type="text"
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <!-- ERROR MESSAGES -->
    <div class="flex items-start justify-between w-full">
      <div v-if="inputState.error" class="w-full">
        <p class="text-xs w-full text-red-500">{{ inputState.errorMessage }}</p>
      </div>
      <div class="w-full" v-if="maxCharacters">
        <p
          class="text-xs text-right"
          :class="{ 'text-red-500': (modelValue?.length || 0) > parseInt(maxCharacters) }"
        >
          {{ `${modelValue?.length || 0}/${maxCharacters}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
/**
 * EMITS
 */
const emit = defineEmits(['blur', 'update:modelValue'])

/**
 * PROPS
 */
const props = defineProps({
  required: {
    type: Boolean,
    default: false
  },
  label: { type: String },
  info: { type: String },
  placeholder: { type: String },
  modelValue: { type: String },
  maxCharacters: { type: String },
  errorMessages: {
    type: String
  },
  resizable: { type: Boolean, default: true }
})

/**
 * INPUT STATE
 */
const inputState = ref({
  focus: false,
  error: false,
  errorMessage: ''
})

/**
 * INPUT EVENTS
 */
const focus = () => (inputState.value.focus = true)
const blur = () => {
  inputState.value.focus = false
  emit('blur')
}

watch(
  () => props.errorMessages,
  (newErrorMessage) => {
    if (!newErrorMessage) {
      inputState.value.error = false
      inputState.value.errorMessage = ''
      return
    }
    inputState.value.error = true
    inputState.value.errorMessage = newErrorMessage.toString()
  }
)
</script>

<style scoped>
input[type='text'] {
  outline: none;
}
</style>
