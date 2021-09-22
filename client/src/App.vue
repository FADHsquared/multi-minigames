<script setup lang="ts">
import TheNav from './components/TheNav.vue'
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-800 dark:text-gray-50 min-h-screen">
    <TheNav />
    <router-view />
  </div>
</template>
