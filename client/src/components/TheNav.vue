<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import useDaisyUIDarkMode from '../composables/useDaisyUIDarkMode'

const [isDarkModeString, toggleDarkMode] = useDaisyUIDarkMode()
</script>

<template>
  <nav class="navbar bg-base-200">
    <ul class="flex-grow mx-2 gap-x-3">
      <li class="link-hover">
        <router-link to="/" exact-active-class="font-bold">Home</router-link>
      </li>
      <li class="link-hover">
        <router-link to="/games" exact-active-class="font-bold">
          Games
        </router-link>
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
