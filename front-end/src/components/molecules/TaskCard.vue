<template>
  <div ref="cardRef" class="relative bg-[#1A1A1A] rounded-lg shadow p-5 w-full h-[25vh] cursor-pointer hover:shadow-lg transition">
    <div class="flex items-start justify-between mb-2">
      <TaskStatus :label="task.status" :status="task.status" />
      <div class="relative" @click.stop="toggleMenu" ref="menuRef">
        <button class="hover:bg-[#333333] rounded-full p-1" aria-label="Open menu">
          <svg class="h-5 text-gray-500" fill="currentColor" viewBox="0 0 6 20">
            <circle cx="3" cy="3" r="2"/>
            <circle cx="3" cy="10" r="2"/>
            <circle cx="3" cy="17" r="2"/>
          </svg>
        </button>
        <div v-if="isMenuOpen" class="absolute right-0 w-40 bg-[#333333] rounded  shadow-lg z-10">
          <button @click="openUpdateForm" class="block w-full px-4 py-2 text-left text-[#F5F5F5] rounded-t hover:text-[#F5F5F5] hover:bg-[#666666] ">Update Task</button>
          <button @click="removeTask" class="block w-full px-4 py-2 text-left hover:bg-red-600 rounded-b text-red-600 hover:text-white">Remove Task</button>
        </div>
      </div>
    </div>
    <h3 class="font-semibold text-lg my-2 text-[#F5F5F5] pl-1">{{ task.title }}</h3>
    <div class="my-4 pl-2 text-gray-600 text-sm overflow-y-auto mr-3" style="flex-grow:1;max-height:calc(20vh-100px)">
      <div class="font-medium text-[#F5F5F5]">{{ task.description }}</div>
    </div>
    <div class="absolute bottom-0 mb-4 flex text-xs text-[#999999]">
      <span>{{ task.start_date }}</span><span class="px-1">-</span><span>{{ task.due_date }}</span>
    </div>
  </div>
  
  <UpdateTaskForm 
    v-if="isUpdating" 
    :task="task" 
    @cancel="isUpdating = false" 
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TaskStatus from '@/components/atoms/TaskStatus.vue'
import UpdateTaskForm from '@/components/organisms/UpdateTaskForm.vue'
import axios from 'axios'

const props = defineProps({
  task: Object,
  onUpdate: Function,
  onRemove: Function,
  onComplete: Function,
  onCancel: Function
})

const isMenuOpen = ref(false)
const isUpdating = ref(false)
const cardRef = ref(null)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(e) {
  if (isMenuOpen.value && !cardRef.value.contains(e.target)) {
    isMenuOpen.value = false
  }
}

function openUpdateForm() {
  isMenuOpen.value = false
  isUpdating.value = true
}

async function removeTask() {
  try {
    isMenuOpen.value = false
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${props.task.id}`)
    window.location.reload(); 
    emit('removeTaskSuccess', props.task.id)
  } catch (error) {
    console.error('Error removing task:', error)
  }
}

onMounted(() => document.addEventListener('click', closeMenu))
onBeforeUnmount(() => document.removeEventListener('click', closeMenu))
</script>