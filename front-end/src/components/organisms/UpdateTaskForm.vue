<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
    <div class="bg-[#1A1A1A] rounded-lg shadow-lg  w-[90vw] md:w-full max-w-md p-6 relative">
      <button @click="$emit('cancel')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✕</button>
      <h2 class="text-xl font-bold mb-4 text-[#F5F5F5]">Update Task</h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-[#F5F5F5] mb-1">Title</label>
          <TextInput v-model="form.title" type="text" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#F5F5F5] mb-1">Description</label>
          <Textarea v-model="form.description" rows="4" required />
        </div>
        <div class="grid grid-cols-1 gap-4">
          <label class="block text-sm font-medium text-[#F5F5F5] mb-1">Due Date</label>
          <TextInput v-model="form.due_date" type="date" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#F5F5F5] mb-1">Status</label>
          <select v-model="form.status" required       class="w-full px-4 py-2 rounded cursor-pointer bg-[#333333] text-[#F5F5F5] appearance-none">
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-[#3498DB] hover:bg-[#2980B9] text-white px-8 py-2 rounded-3xl">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import TextInput from '@/components/atoms/TextInput.vue';
import Textarea from '@/components/atoms/Textarea.vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['update', 'cancel']);
const router = useRouter();

const form = reactive({
  title: '',
  description: '',
  due_date: '',
  status: 'In Progress'
});

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${props.task.id}`);
    const fetchedTask = response.data;
    Object.assign(form, {
      title: fetchedTask.title,
      description: fetchedTask.description,
      due_date: fetchedTask.due_date,
      status: fetchedTask.status
    });
  } catch (error) {
    console.error('Error fetching task data:', error);
  }
});

async function onSubmit() {
  try {
    const payload = {
      title: form.title,
      description: form.description,
      due_date: form.due_date,
      status: form.status
    };

    console.log('Sending payload:', payload);

    const { data } = await axios.put(`http://127.0.0.1:8000/api/tasks/${props.task.id}`, payload);
    window.location.reload(); 

    emit('update', data);
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.response) {
      console.error('API validation error details:', error.response.data);
    }
  }
}
</script>