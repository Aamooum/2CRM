<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-200">{{ label }}</label>
    <TextInput
      :modelValue="modelValue"
      @update:modelValue="val => $emit('update:modelValue', val)"
      :type="type"
      :placeholder="placeholder"
      :required="required"
    />
  </div>
</template>

<script setup>
import TextInput from '@/components/atoms/TextInput.vue'

const props = defineProps({
  label: String,
  modelValue: String,
  type: String,
  placeholder: String,
  required: Boolean,
})
const emit = defineEmits(['update:modelValue'])
</script>
