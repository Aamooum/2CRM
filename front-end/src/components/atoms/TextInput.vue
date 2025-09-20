<template>
  <input
    ref="inputRef"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    class="date-input w-full px-4 py-2 rounded bg-[#333333] text-[#F5F5F5] border border-[#333333] 
           focus:outline-none focus:border-[#F5F5F5] focus:ring-1 focus:ring-[#F5F5F5]
           transition-all"
    :class="{ 'cursor-pointer': type === 'date' }"
    @click="onInputClick"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  required: Boolean,
})
defineEmits(['update:modelValue'])

const inputRef = ref(null)

function onInputClick(event) {
  if (props.type === 'date' && inputRef.value) {
    if (typeof inputRef.value.showPicker === 'function') {
      inputRef.value.showPicker()
    } else {
      inputRef.value.focus()
    }
    event.preventDefault()
  }
}
</script>

<style scoped>
.date-input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}
.date-input[type="date"]::-moz-calendar-picker-indicator {
  display: none;
}
</style>
