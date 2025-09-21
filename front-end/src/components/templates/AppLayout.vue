<template>
  <div class="flex min-h-screen bg-[#111111]">
    <div
      class="md:hidden p-4 top-0 left-0 z-50 transition-all duration-300 ease-in-out"
      :class="isMobileMenuOpen ? 'fixed' : 'absolute'"
    >
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-[#F5F5F5] mt-[13px] focus:outline-none">
        <TextAlignJustify v-if="!isMobileMenuOpen" size="30" />
        <X v-else size="30" />
      </button>
    </div>

    <aside v-if="isMobileMenuOpen" class="md:hidden fixed top-0 left-0 h-full w-64 bg-[#1A1A1A] text-[#F5F5F5] z-40 transition-transform duration-300 ease-in-out transform -translate-x-full"
      :class="{ 'translate-x-0': isMobileMenuOpen }"
    >
      <div class="invisible md:flex items-center text-xl font-bold mb-8 pt-4 p-4">
        <img class="w-[70px]" src="https://static.vecteezy.com/system/resources/previews/019/637/202/non_2x/blue-tape-circle-logo-icon-free-png.png" alt="logo">
        2CRM
      </div>
      <nav class="flex-1 px-2">
        <ul class="space-y-2">
          <router-link @click="isMobileMenuOpen = false" to="/tasks" class="block w-full px-4 py-2 text-[#F5F5F5] font-semibold transition-colors duration-300 hover:bg-[#333333]">
            My Tasks
          </router-link>
          <router-link @click="isMobileMenuOpen = false" to="/notifications" class="block w-full px-4 py-2 text-[#F5F5F5] font-semibold transition-colors duration-300 hover:bg-[#333333]">
            Notifications
          </router-link>
        </ul>
      </nav>
    </aside>

    <aside class="hidden md:flex flex-col bg-[#1A1A1A] w-64 shadow px-2">
      <h2 class="flex items-center text-xl text-[#F5F5F5] font-bold mb-8 pt-4">
        <img class="w-[70px]" src="https://static.vecteezy.com/system/resources/previews/019/637/202/non_2x/blue-tape-circle-logo-icon-free-png.png" alt="logo">
        2CRM
      </h2>
      <nav class="flex-1">
        <ul class="space-y-2">
          <router-link to="/tasks" class="block w-full px-4 py-2 text-[#F5F5F5] font-semibold transition-colors duration-300 hover:bg-[#333333]">
            My Tasks
          </router-link>
          <router-link to="/notifications" class="block w-full px-4 py-2 text-[#F5F5F5] font-semibold transition-colors duration-300 hover:bg-[#333333]">
            Notifications
          </router-link>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 py-8 px-4 md:px-12 relative">
      <div class="flex justify-between items-start md:items-center mb-6">
        <h1 class="text-[#F5F5F5] md:text-3xl font-bold">
          <slot name="header hidden"></slot>
        </h1>
        <div class="flex items-center space-x-4">
          <div class="relative" ref="notificationMenuRef">
            <button @click="toggleNotifications" class="rounded-full p-2 bg-[#F5F5F5] hover:bg-[#CCCCCC] focus:outline-none focus:ring">
              <Bell />
              <span v-if="hasNewNotifications" class="absolute top-[2px] right-[0.6px] h-3 w-3 bg-[#2980B9] rounded-full"></span>
            </button>
            <div v-if="isNotificationsOpen" class="absolute left-[-50px] md:left-auto md:right-0 mt-2 w-72 bg-[#F5F5F5] rounded-md shadow-lg py-1 z-50">
              <div v-if="limitedNotifications.length === 0" class="px-4 py-2 text-sm text-gray-500">
                No new notifications.
              </div>
              <div v-else>
                <div v-for="(notif, index) in limitedNotifications" :key="index" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <p>{{ notif.message }}</p>
                  <p class="text-xs text-gray-400">{{ formatDistanceToNow(new Date(notif.created_at)) }} ago</p>
                </div>
                <div class="border-t border-gray-200 mt-1"></div>
                <router-link to="/notifications" class="block w-full text-center px-4 py-2 text-sm text-[#3498DB] hover:bg-gray-200">
                  See all notifications
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="authStore.user" class="relative" ref="profileMenuRef">
            <button @click="toggleProfileMenu" class="flex items-center space-x-2 rounded-full p-2 pr-4 bg-[#F5F5F5] hover:bg-[#CCCCCC] focus:outline-none focus:ring">
              <img :src="authStore.user.image" alt="User Profile" class="h-8 w-8 rounded-full object-cover">
              <span class="font-medium text-gray-700">{{ authStore.user.full_name }}</span>
            </button>
            <div v-if="isProfileMenuOpen" class="absolute right-0 mt-2 w-48 bg-[#F5F5F5] rounded-md shadow-lg z-50">
              <button @click="logout" class="block w-full hover:bg-[#CCCCCC] rounded-md text-left px-2 py-3 text-sm text-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <slot name="content"></slot>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notifications';
import { useRouter } from 'vue-router';
import echo from '@/echo';
import { formatDistanceToNow } from 'date-fns';
import { Bell, TextAlignJustify, X } from 'lucide-vue-next';

const isProfileMenuOpen = ref(false);
const isNotificationsOpen = ref(false);
const notificationMenuRef = ref(null);
const profileMenuRef = ref(null);
const hasNewNotifications = ref(false);
const isMobileMenuOpen = ref(false);

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const router = useRouter();

const limitedNotifications = computed(() => notificationStore.notifications.slice(0, 5));

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
  isNotificationsOpen.value = false;
}

function logout() {
  authStore.clearToken();
  isProfileMenuOpen.value = false;
  router.push('/login');
}

function toggleNotifications() {
  isNotificationsOpen.value = !isNotificationsOpen.value;
  isProfileMenuOpen.value = false;
  if (isNotificationsOpen.value) {
    hasNewNotifications.value = false;
  }
}

function closeMenus(event) {
  if (isProfileMenuOpen.value && profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
  if (isNotificationsOpen.value && notificationMenuRef.value && !notificationMenuRef.value.contains(event.target)) {
    isNotificationsOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenus);

  echo.channel('tasks').listen('TaskCreated', (e) => {
    notificationStore.addNotification(e);
    hasNewNotifications.value = true;
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenus);

  echo.leaveChannel('tasks');
});
</script>