<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import useTailwindDarkMode from '../composables/useTailwindDarkMode'

const [isDarkModeString, toggleDarkMode] = useTailwindDarkMode()
</script>

<template>
  <nav
    class="
      bg-green-600
      text-white
      dark:bg-green-800
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
        <router-link to="/about" exact-active-class="font-bold">
          About
        </router-link>
      </li>
    </ul>
    <div class="flex gap-x-2 items-center">
      <button class="active:opacity-60" @click="toggleDarkMode">
        <Moon v-if="isDarkModeString === 'true'" />
        <Sun v-else />
      </button>

      <div class="bg-white w-8 h-8 rounded-full" />
      <p>FADHsquared</p>
    </div>
  </nav>
</template>
