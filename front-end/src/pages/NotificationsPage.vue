<template>
  <AppLayout>
    <template #header>
      Notifications
    </template>
    <template #content>
      <div v-if="notificationStore.notifications.length === 0" class="text-white text-lg">
        Vous n'avez pas de nouvelles notifications.
      </div>
      <div v-else class="space-y-4 mt-[70px] md:mt-[80px]">
        <div
          v-for="(notif, index) in notificationStore.notifications"
          :key="index"
          class="bg-[#1A1A1A] text-[#F5F5F5] p-4 rounded-lg shadow-md border border-[#333333] transition-transform duration-300 hover:scale-[1.01]"
        >
          <p class="font-semibold">{{ notif.message }}</p>
          <p class="text-sm text-gray-400 mt-1">
            {{ formatDistanceToNow(new Date(notif.created_at), { addSuffix: true, locale: fr }) }}
          </p>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNotificationStore } from '@/stores/notifications';
import AppLayout from '@/components/templates/AppLayout.vue';

const notificationStore = useNotificationStore();

onMounted(() => {
  notificationStore.loadNotifications();
});
</script>