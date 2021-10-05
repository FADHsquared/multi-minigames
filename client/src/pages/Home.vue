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
      'Submit a PR or contact our Discord. We suggest you send a framework-agnostic module for your game.'
  },
  {
    name: 'Vue code',
    icon: Zap,
    description:
      'This is the fastest method: Submit a framework-agnostic module along with a Vue implementation example.'
  }
]
</script>

<template>
  <h1 class="mt-6 mb-3 text-center text-5xl font-semibold">Multi Minigames</h1>
  <p class="text-center">
    A collection of small games, playable offline or online.
  </p>
  <h2 class="my-3 text-center text-3xl font-semibold">
    Featured External Games
  </h2>
  <div class="self-center w-[calc(100%-3rem)] max-w-4xl relative">
    <img
      src="../assets/koddl-io-screenshot.png"
      alt="koddl.io"
      class="rounded-box"
    />
    <div
      class="
        card
        bg-secondary
        text-accent-content
        shadow
        absolute
        bottom-3
        left-1/2
        -translate-x-1/2
      "
    >
      <div class="card-body">
        <div class="card-title">koddl.io</div>
        <p>The skribbl for coding students.</p>
        <a href="https://koddl-io.herokuapp.com/" class="link"
          >https://koddl-io.herokuapp.com/</a
        >
      </div>
    </div>
  </div>
  <h2 class="my-3 text-center text-3xl font-semibold">Contribute</h2>
  <div
    class="
      flex flex-col
      md:flex-row
      gap-y-3 gap-x-3
      max-w-xs
      md:max-w-5xl
      mx-auto
      px-3
      mb-3
    "
  >
    <div
      v-for="contributionMethod in contributionMethods"
      :key="contributionMethod.name"
      class="card bordered flex-1"
    >
      <div class="card-body flex flex-col items-center">
        <component :is="contributionMethod.icon" />
        <p class="card-title">{{ contributionMethod.name }}</p>
        <p class="text-justify">{{ contributionMethod.description }}</p>
      </div>
    </div>
  </div>
</template>
