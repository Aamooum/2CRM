<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center bg-[#1A1A1A] text-[#F5F5F5] p-4">
    <div class="space-y-4 md:space-y-6">
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#F5F5F5]">404</h1>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300">Page Not Found</h2>
      <p class="text-base sm:text-lg text-gray-400 max-w-sm md:max-w-lg mx-auto pb-8">
        The page you are looking for does not exist. It may have been moved or deleted.
      </p>
      <router-link to="/tasks">
        <button
          class="px-5 py-2.5 sm:px-6 sm:py-3 rounded-3xl bg-[#3498DB] hover:bg-[#2980B9] font-medium transition-colors duration-200 text-sm sm:text-base"
        >
          Go to My Tasks
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>