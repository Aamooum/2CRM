<template>
  <form @submit.prevent="onSubmit" class="space-y-4 w-full max-w-md">
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
    <button
      type="submit"
      class="w-full py-2 rounded bg-[#3498DB] hover:bg-[#2980B9] font-medium transition"
    >
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import FormField from '@/components/molecules/FormField.vue';

const props = defineProps({
  submitLabel: { type: String, default: 'Continue' },
  errors: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['submit']);

const email = ref('');
const password = ref('');
const localErrors = ref({});

watch(() => props.errors, (newErrors) => {
  localErrors.value = newErrors;
}, { immediate: true });

function onSubmit() {
  localErrors.value = {};
  const payload = {
    email: email.value,
    password: password.value
  };
  emit('submit', payload);
}
</script>