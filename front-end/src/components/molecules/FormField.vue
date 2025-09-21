<template>
  <div>
    <label class="block text-sm font-medium text-[#F5F5F5] mb-1">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 rounded bg-[#333333] text-[#F5F5F5] border"
      :class="{
        'border-red-500 focus:ring-red-500': errorMessage,
        'border-[#333333] focus:ring-[#F5F5F5]': !errorMessage
      }"
    />
    <p v-if="errorMessage" class="mt-1 text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' }
});
defineEmits(['update:modelValue']);
</script>