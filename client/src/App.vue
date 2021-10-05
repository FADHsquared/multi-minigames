<script setup lang="ts">
import TheNav from './components/TheNav.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheNav />
    <router-view />
  </div>
</template>
