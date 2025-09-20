<template>
  <div
    class="w-full h-full bg-center bg-cover"
    :style="{ backgroundImage: `url(${imageUrl})` }"
  >
    <div class="flex items-center justify-center h-full bg-black/40">
      <img class="w-[100px]" src="https://static.vecteezy.com/system/resources/previews/019/637/202/non_2x/blue-tape-circle-logo-icon-free-png.png" alt="logo">
      <span class="text-4xl font-bold text-white">
        2CRM
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
:host {
  min-height: 100vh;
}
</style>
