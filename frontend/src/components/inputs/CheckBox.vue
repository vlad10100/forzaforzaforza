<template>
  <div
    class="border cursor-pointer"
    :class="[
      checkboxSizingMap[size].outer,
      borderStyleMap[borderStyle],
      outerBorderColor,
      checked === true ? checkedBackgroundColor : initialBackgroundColor
    ]"
  >
    <div v-if="isCheckbox" class="pt-[1px]">
      <div
        v-if="checked"
        class="border-b-2 border-l-2 mx-auto -rotate-45"
        :class="[checkboxSizingMap[size].check, checkColor]"
      ></div>
      <div v-else></div>
    </div>
    <div v-else class="flex items-center justify-center h-full">
      <div
        v-if="checked"
        class="rounded-full"
        :class="[radioColor, checkboxSizingMap[size].circle]"
      ></div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String as () => 'extra_small' | 'small' | 'medium' | 'large',
    default: 'small'
  },
  borderStyle: {
    type: String as () => 'square' | 'rounded' | 'circle',
    default: 'rounded'
  },
  checked: { type: Boolean, default: false },
  isCheckbox: { type: Boolean, default: true },
  outerBorderColor: { type: String, default: 'border-black' },
  checkColor: { type: String, default: 'border-black' },
  radioColor: { type: String, default: 'bg-black' },
  initialBackgroundColor: { type: String, default: 'bg-white' },
  checkedBackgroundColor: { type: String, default: 'bg-white' }
})

const borderStyleMap = {
  square: '',
  rounded: 'rounded-md',
  circle: 'rounded-full'
}

const checkboxSizingMap = {
  extra_small: {
    outer: 'h-5 w-5',
    check: 'h-1.5 w-3 my-1',
    circle: 'h-2 w-2'
  },
  small: {
    outer: 'h-6 w-6',
    check: 'h-1.5 w-3.5 my-1.5',
    circle: 'h-3 w-3'
  },
  medium: {
    outer: 'h-8 w-8',
    check: 'h-2 w-6 mt-2',
    circle: 'h-4 w-4'
  },
  large: {
    outer: 'h-10 w-10',
    check: 'h-3 w-7 mt-2',
    circle: 'h-5 w-5'
  }
}
</script>

<style scoped>
input[type='text'] {
  outline: none;
}
</style>
