<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    class="w-full px-4 py-2 rounded bg-[#333333] text-[#F5F5F5] border border-[#333333] 
           focus:outline-none focus:border-[#F5F5F5] focus:ring-1 focus:ring-[#F5F5F5]
           transition-all duration-300"
  ></textarea>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
});
defineEmits(['update:modelValue']);
</script>