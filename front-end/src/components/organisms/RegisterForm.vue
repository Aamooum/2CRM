<template>
  <form @submit.prevent="onSubmit" class="space-y-4 w-full max-w-md">
    <FormField
      label="First Name"
      v-model="firstName"
      type="text"
      placeholder="John"
      required
      :errorMessage="errors.full_name ? errors.full_name[0] : ''"
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
      :errorMessage="errors.email ? errors.email[0] : ''"
    />

    <FormField
      label="Password"
      v-model="password"
      type="password"
      placeholder="••••••••"
      required
      :errorMessage="errors.password ? errors.password[0] : ''"
    />

    <FormField
      label="Confirm Password"
      v-model="confirmPassword"
      type="password"
      placeholder="••••••••"
      required
      :errorMessage="errors.password_confirmation ? errors.password_confirmation[0] : ''"
    />

    <button
      type="submit"
      class="w-full py-2 rounded bg-[#3498DB] hover:bg-[#2980B9] font-medium transition"
    >
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import FormField from '@/components/molecules/FormField.vue'

const props = defineProps({
  submitLabel: { type: String, default: 'Sign In with Email' },
  errors: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['submit'])

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function onSubmit() {
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