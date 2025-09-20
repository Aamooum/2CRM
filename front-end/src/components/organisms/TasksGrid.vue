<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>
<script setup>
import TaskCard from '@/components/molecules/TaskCard.vue'
defineProps({ tasks: Array })
</script>
