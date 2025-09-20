<template>
  <form @submit.prevent="onSubmit" class="space-y-4 w-full max-w-md">
    <FormField
      label="First Name"
      v-model="firstName"
      type="text"
      placeholder="John"
      required
    />

    <FormField
      label="Last Name"
      v-model="lastName"
      type="text"
      placeholder="Doe"
      required
    />

    <FormField
      label="Email"
      v-model="email"
      type="email"
      placeholder="name@example.com"
      required
    />

    <FormField
      label="Password"
      v-model="password"
      type="password"
      placeholder="••••••••"
      required
    />
    <p v-if="errors.password" class="text-xs text-red-500">{{ errors.password }}</p>

    <FormField
      label="Confirm Password"
      v-model="confirmPassword"
      type="password"
      placeholder="••••••••"
      required
    />
    <p v-if="errors.confirmPassword" class="text-xs text-red-500">{{ errors.confirmPassword }}</p>

    <button
      type="submit"
      class="w-full py-2 rounded bg-[#3498DB] hover:bg-[#2980B9] font-medium transition"
    >
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import FormField from '@/components/molecules/FormField.vue'

const props = defineProps({
  submitLabel: { type: String, default: 'Sign In with Email' }
})
const emit = defineEmits(['submit'])

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errors = reactive({
  password: '',
  confirmPassword: ''
})

watch(password, (val) => {
  if (val.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/[A-Za-z]/.test(val) || !/[0-9]/.test(val)) {
    errors.password = 'Password must contain letters and numbers.'
  } else {
    errors.password = ''
  }

  if (confirmPassword.value && val !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match.'
  } else {
    errors.confirmPassword = ''
  }
})


watch(confirmPassword, (val) => {
  if (val && val !== password.value) {
    errors.confirmPassword = 'Passwords do not match.'
  } else {
    errors.confirmPassword = ''
  }
})

function onSubmit() {
  if (errors.password || errors.confirmPassword) {
    return
  }

  const payload = {
    full_name: `${firstName.value} ${lastName.value}`,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqpoo1iI8Lm9cp0sOpTVLVGX6dqt_Jld4I6g&s'
  }
  emit('submit', payload)
}
</script>
