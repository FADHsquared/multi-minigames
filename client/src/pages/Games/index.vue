<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Multi Minigames - Games'
})
</script>

<template>
  <h1 class="my-5 text-center text-5xl font-semibold">Games</h1>
  <div class="mx-4 flex">
    <div class="bg-gray-100 dark:bg-gray-900 rounded shadow">
      <img src="" alt="Tic-tac-toe image" />
      <router-link to="/games/tic-tac-toe" class="hover:underline">
        Tic-tac-toe
      </router-link>
    </div>
  </div>
</template>
