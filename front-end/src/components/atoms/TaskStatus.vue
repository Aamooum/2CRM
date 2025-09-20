<template>
  <span
    class="rounded-full px-4 py-1 text-xs font-medium  bg-[#111111] "
    :class="statusClass"
  >{{label}}</span>
</template>

<script setup>
const props = defineProps({
  label: String,
  status: String
})
const statusClass = {
  'In Progress': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
  'Canceled': ' text-red-700'
}[props.status] || 'bg-gray-100 text-gray-700'
</script>
