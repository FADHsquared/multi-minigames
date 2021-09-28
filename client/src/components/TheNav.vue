<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import useTailwindDarkMode from '../composables/useTailwindDarkMode'

const [isDarkModeString, toggleDarkMode] = useTailwindDarkMode()
</script>

<template>
  <nav
    class="
      border-b-4 border-yellow-600
      px-3
      py-2
      flex
      justify-between
      items-center
    "
  >
    <ul class="flex gap-x-3">
      <li class="hover:underline">
        <router-link to="/" exact-active-class="font-bold">Home</router-link>
      </li>
      <li class="hover:underline">
        <router-link to="/games" exact-active-class="font-bold">
          Games
        </router-link>
      </li>
    </ul>
    <div class="flex gap-x-2 items-center">
      <button class="active:opacity-60" @click="toggleDarkMode">
        <Moon v-if="isDarkModeString === 'true'" />
        <Sun v-else />
      </button>
      <button class="flex gap-x-2 items-center hover:bg-gray-50/20">
        <div class="bg-white w-8 h-8 rounded-full" />
        <p>FADHsquared</p>
      </button>
    </div>
  </nav>
</template>
