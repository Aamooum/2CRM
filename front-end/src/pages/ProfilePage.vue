<template>
  <AppLayout>
    <template #header>
      My Profile
    </template>
    <template #content>
      <div class="mb-6 flex my-[50px] items-start md:items-center justify-between">
        <h2 class="text-3xl font-bold text-[#F5F5F5]">
          My Profile
        </h2>
      </div>

      <div v-if="user" class="max-w-md mt-[50px] mx-auto p-6 bg-[#1A1A1A] rounded-lg shadow-xl text-[#F5F5F5]">
        <div class="mb-4 text-center">
          <img :src="user.image" alt="Profile Image" class="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-gray-600">
          <p class="text-gray-400">Update your profile details below</p>
        </div>

        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium mb-1 text-gray-400">First Name</label>
            <TextInput id="firstName" v-model="firstName" placeholder="First Name" required />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium mb-1 text-gray-400">Last Name</label>
            <TextInput id="lastName" v-model="lastName" placeholder="Last Name" required />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium mb-1 text-gray-400">Phone Number</label>
            <TextInput id="phone" v-model="user.phone_number" placeholder="Phone Number" />
          </div>
          <div class="mb-6">
            <label for="address" class="block text-sm font-medium mb-1 text-gray-400">Address</label>
            <TextInput id="address" v-model="user.address" placeholder="Address" />
          </div>
          <button
            @click="updateProfile"
            class="flex items-center mx-auto bg-[#3498DB] hover:bg-[#2980B9] text-[#F5F5F5] px-5 md:px-4 py-3 rounded-3xl shadow"
            >
                <span class="pr-1 hidden md:block"><Check size="23" /></span>
                <span class="font-medium text-sm md:text-base whitespace-nowrap">Save Profile</span>
            </button>
        </form>
      </div>
      <div v-else class="text-center text-gray-400 mt-10">
        Loading profile...
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/atoms/TextInput.vue';
import AppLayout from '@/components/templates/AppLayout.vue';
import { Check } from 'lucide-vue-next';
import axios from 'axios';

const auth = useAuthStore();
const user = ref(null);
const firstName = ref('');
const lastName = ref('');

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser();
  }
  user.value = auth.user;
  
  if (user.value && user.value.full_name) {
    const nameParts = user.value.full_name.split(' ');
    firstName.value = nameParts[0] || '';
    lastName.value = nameParts.slice(1).join(' ') || '';
  }
});

async function updateProfile() {
    try {
        const payload = {
        full_name: `${firstName.value} ${lastName.value}`,
        phone_number: user.value.phone_number,
        address: user.value.address
        };

        await axios.patch('/profile', payload);

        window.location.reload();
    } catch (error) {
        console.error('Failed to update profile:', error);
    }
}
</script>