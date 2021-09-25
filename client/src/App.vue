<script setup lang="ts">
import TheNav from './components/TheNav.vue'
</script>

<template>
  <div
    class="
      min-h-screen
      flex flex-col
      bg-gray-50
      dark:bg-gray-800 dark:text-gray-50
    "
  >
    <TheNav />
    <router-view />
  </div>
</template>
