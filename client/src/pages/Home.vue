<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { Code2, Lightbulb, Zap } from 'lucide-vue-next'

useHead({
  title: 'Multi Minigames - Home'
})

const contributionMethods = [
  {
    name: 'Idea',
    icon: Lightbulb,
    description:
      'Got an idea? Submit a PR or contact us on Discord to explain the details of your game.'
  },
  {
    name: 'JavaScript code',
    icon: Code2,
    description:
      "Submit a PR or contact us on Discord and we'll convert it to a Vue game and add it to this site."
  },
  {
    name: 'Vue code',
    icon: Zap,
    description:
      'This is the fastest way you can get your game up and running on this site! A good PR can be swiftly merged by us.'
  }
]
</script>

<template>
  <h1 class="my-5 text-center text-5xl font-semibold">Multi Minigames</h1>
  <p class="text-center">
    A collection of small games, playable offline or online.
  </p>
  <h2 class="my-2.5 text-center text-3xl font-semibold">Contribute</h2>
  <div class="flex flex-col sm:flex-row gap-y-4 max-w-xs sm:max-w-5xl mx-auto">
    <div
      v-for="contributionMethod in contributionMethods"
      :key="contributionMethod.name"
      class="
        flex-1
        border-4 border-yellow-600
        rounded-xl
        flex flex-col
        items-center
        p-2
        mx-2
      "
    >
      <component :is="contributionMethod.icon" class="my-1" />
      <p class="font-semibold text-lg">{{ contributionMethod.name }}</p>
      <p class="text-justify">{{ contributionMethod.description }}</p>
    </div>
  </div>
</template>
