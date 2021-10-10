<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import useDaisyUIDarkMode from '../composables/useDaisyUIDarkMode'

const [isDarkModeString, toggleDarkMode] = useDaisyUIDarkMode()

const links = [
  {
    to: '/',
    name: 'Home'
  },
  {
    to: '/games',
    name: 'Games'
  },
  {
    to: '/leaderboard',
    name: 'Leaderboard'
  }
]
</script>

<template>
  <nav class="navbar bg-base-200">
    <ul class="flex-grow mx-2 gap-x-4">
      <li v-for="link in links" :key="link.name" class="link-hover">
        <router-link :to="link.to" exact-active-class="font-bold">{{
          link.name
        }}</router-link>
      </li>
    </ul>
    <div class="gap-x-2">
      <button class="btn btn-outline" @click="toggleDarkMode">
        <Moon v-if="isDarkModeString === 'true'" />
        <Sun v-else />
      </button>
    </div>
  </nav>
</template>
