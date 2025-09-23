<template>
  <AppLayout>
    <template #header>
      My Tasks
    </template>
    <template #content>
      <div class="mb-6 flex my-[50px] items-start md:items-center justify-between">
        <div>
          <button
            v-for="status in statuses"
            :key="status"
            @click="selectedStatus = status"
            :class="selectedStatus===status ? 'bg-[#333333] text-[#F5F5F5]' : 'bg-[#333333] text-[#999999]'"
            class="px-3 py-1 mb-2 mr-2 md:mr-2 ml-0 rounded-full text-sm"
          >
            {{ status }}
          </button>
        </div>
        <button @click="openCreate" class="flex items-center bg-[#3498DB] hover:bg-[#2980B9] text-[#F5F5F5] px-3 md:px-4 py-2 rounded-3xl shadow">
          <span class="pr-1 hidden md:block"><Plus size="23" /></span>
          <span class="font-medium text-sm md:text-base whitespace-nowrap">Create Task</span>
        </button>
      </div>

      <TasksGrid
        :tasks="filteredTasks"
        :onUpdate="openEdit"
      />

      <CreateTaskForm
        v-if="showCreateForm"
        @create="onCreate"
        @cancel="closeForms"
      />
      <UpdateTaskForm
        v-if="editTask"
        :task="editTask"
        @cancel="closeForms"
        @update="onUpdate"
      />
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Plus } from 'lucide-vue-next';
import AppLayout from '@/components/templates/AppLayout.vue';
import TasksGrid from '@/components/organisms/TasksGrid.vue';
import CreateTaskForm from '@/components/organisms/CreateTaskForm.vue';
import UpdateTaskForm from '@/components/organisms/UpdateTaskForm.vue';
import { useNotificationStore } from '@/stores/notifications';

const notificationStore = useNotificationStore();
const tasks = ref([]);
const showCreateForm = ref(false);
const editTask = ref(null);
const statuses = ['In Progress', 'Completed', 'Canceled'];
const selectedStatus = ref(statuses[0]);

function formatDate(iso) {
  if (!iso) return '';
  const [date] = iso.split('T');
  const [y, m, d] = date.split('-');
  return `${d}-${m}-${y.slice(2)}`;
}
function normalize(raw) {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    status: raw.status,
    start_date: formatDate(raw.created_at),
    due_date: formatDate(raw.due_date)
  };
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/tasks');
    tasks.value = data.map(normalize);
    notificationStore.loadNotifications();

  } catch (e) {
    console.error('Fetch tasks failed', e);
  }
});


const filteredTasks = computed(() =>
  tasks.value.filter(t => t.status === selectedStatus.value)
);

function openCreate() {
  showCreateForm.value = true;
  editTask.value = null;
}
function openEdit(task) {
  editTask.value = task;
  showCreateForm.value = false;
}
function closeForms() {
  showCreateForm.value = false;
  editTask.value = null;
}

function onCreate(raw) {
  tasks.value.unshift(normalize(raw));
  closeForms();
}

</script>