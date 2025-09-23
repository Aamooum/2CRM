<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
    <div class="bg-[#1A1A1A] rounded-lg shadow-lg w-[90vw] md:w-full max-w-md p-6 relative">
      <button
        @click="$emit('cancel')"
        class="absolute top-3 right-3 text-gray-200 hover:text-gray-400"
        aria-label="Close"
      >
        ✕
      </button>

      <h2 class="text-xl font-bold mb-4 text-[#F5F5F5]">Create Task</h2>
      <form @submit.prevent="onSubmit" class="space-y-4 max-h-[70vh] overflow-y-auto">
        <div>
          <label class="block text-sm font-medium text-[#F5F5F5] mb-1">Title</label>
          <TextInput
            v-model="form.title"
            type="text"
            placeholder="Finish project proposal"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#F5F5F5] mb-1">Description</label>
          <Textarea 
            v-model="form.description" 
            rows="4" 
            placeholder="Draft and submit the project proposal document" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#F5F5F5] mb-1">Due Date</label>
          <TextInput
            v-model="form.due_date"
            type="date"
            required
          />
          <p v-if="errors.due_date" class="mt-1 text-xs text-red-500">{{ errors.due_date }}</p>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-[#3498DB] hover:bg-[#2980B9] text-[#F5F5F5] px-8 py-2 rounded-3xl"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import TextInput from '@/components/atoms/TextInput.vue'
import Textarea from '@/components/atoms/Textarea.vue'

const emit = defineEmits(['create', 'cancel'])

const form = reactive({
  title: '',
  description: '',
  due_date: '',
  status: 'In Progress'
})

const errors = reactive({
  due_date: ''
})

function validateDate() {
  errors.due_date = ''
  if (!form.due_date) return false
  const selected = new Date(form.due_date)
  const today = new Date()
  today.setHours(0,0,0,0)
  if (selected < today) {
    errors.due_date = 'Due date must be today or later.'
    return false
  }
  return true
}

async function onSubmit() {
  if (!validateDate()) return
  const payload = {
    title: form.title,
    description: form.description,
    due_date: form.due_date,
    status: form.status
  }
  try {
    const res = await axios.post('/tasks', payload)
    emit('create', res.data)
  } catch (e) {
    console.error('Create task failed', e)
  }
}
</script>