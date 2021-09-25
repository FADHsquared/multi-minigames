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
  }
]
</script>

<template>
  <h1 class="my-5 text-center text-5xl font-semibold">Games</h1>
  <div class="mx-4 flex">
    <div
      v-for="game in games"
      :key="game.sublink"
      class="
        bg-gray-100
        dark:bg-gray-900
        px-3.5
        pt-2
        pb-1.5
        flex flex-col
        items-center
        rounded
        shadow
      "
    >
      <component :is="game.icon" size="36" />
      <router-link
        :to="`/games/${game.sublink}`"
        class="text-lg font-semibold hover:underline"
      >
        {{ game.title }}
      </router-link>
    </div>
  </div>
</template>
