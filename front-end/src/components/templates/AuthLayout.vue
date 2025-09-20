<template>
  <div class="flex flex-col md:flex-row h-screen bg-[#1A1A1A] text-gray-100">
    <div class="md:w-1/2 h-1/2 md:h-full">
      <SidebarBrand imageUrl="https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/42c8c2229780587.686b79c3258dd.jpg" />
    </div>

    <div class="md:w-1/2 flex flex-col items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="flex justify-end mb-6">
          <router-link :to="altRoute.path" class="text-sm hover:underline">
            {{ altRoute.label }}
          </router-link>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ title }}</h1>
        <p class="text-gray-400 mb-6">{{ subtitle }}</p>

        <component
          :is="FormComponent"
          :submitLabel="submitLabel"
          @submit="handleSubmit"
          :errors="apiErrors"
        />
        
        <p v-if="apiErrors.general" class="text-red-500 text-sm mt-2 text-center">{{ apiErrors.general[0] }}</p>

        <DividerWithLabel class="my-6" />

        <p class="mt-6 text-xs text-center text-gray-500">
          By clicking continue, you agree to our
          <a href="#" class="underline">Terms of Service</a> and
          <a href="#" class="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import SidebarBrand from '@/components/organisms/SidebarBrand.vue'
import LoginForm from '@/components/organisms/LoginForm.vue'
import RegisterForm from '@/components/organisms/RegisterForm.vue'
import DividerWithLabel from '@/components/molecules/DividerWithLabel.vue'
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const routeName = router.currentRoute.value.name
const apiErrors = ref({});

const config = {
  Register: {
    title: 'Create an account',
    subtitle: 'Enter your details below',
    submitLabel: 'Register',
    altRoute: { path: '/login', label: 'Login' },
    FormComponent: RegisterForm,
    endpoint: 'http://127.0.0.1:8000/api/register'
  },
  Login: {
    title: 'Login to your account',
    subtitle: 'Enter your email and password',
    submitLabel: 'Continue',
    altRoute: { path: '/register', label: 'Register' },
    FormComponent: LoginForm,
    endpoint: 'http://127.0.0.1:8000/api/login'
  },
}

const { title, subtitle, submitLabel, altRoute, FormComponent, endpoint } = config[routeName]
const auth = useAuthStore()

async function handleSubmit(payload) {
  apiErrors.value = {};
  try {
    const { data } = await axios.post(endpoint, payload);
    auth.setToken(data.token);
    window.location.href = "/tasks";
  } catch (err) {
    if (err.response && err.response.status === 422) {
      apiErrors.value = err.response.data.errors;
    } else {
      console.error('API Error:', err);
      apiErrors.value.general = ['password or email incorrect'];
    }
  }
}
</script>

<style scoped>
</style>