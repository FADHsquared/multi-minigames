<script setup lang="ts">
import TheNav from './components/TheNav.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheNav />
    <div class="flex-1 flex flex-col">
      <router-view />
    </div>
  </div>
  <TheFooter />
</template>
