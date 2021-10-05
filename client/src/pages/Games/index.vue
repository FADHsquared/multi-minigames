<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { Grid } from 'lucide-vue-next'

useHead({
  title: 'Multi Minigames - Games'
})

const games = [
  {
    title: 'Tic-tac-toe',
    sublink: 'tic-tac-toe',
    icon: Grid
  },
  {
    title: 'Snake',
    sublink: 'snake',
    icon: Grid
  }
]
</script>

<template>
  <h1 class="my-6 text-center text-4xl font-semibold">Games</h1>
  <div class="mx-3 flex justify-center gap-x-3">
    <div v-for="game in games" :key="game.sublink" class="card bordered">
      <div class="card-body flex flex-col items-center">
        <component :is="game.icon" :size="36" />
        <router-link
          :to="`/games/${game.sublink}`"
          class="text-lg font-semibold hover:underline"
        >
          {{ game.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>
