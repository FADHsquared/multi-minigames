<script setup lang="ts">
const technologies = [
  {
    href: 'https://v3.vuejs.org/',
    logoSrc:
      'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
    alt: 'Vue logo'
  },
  {
    href: 'https://nuxtjs.org/',
    logoSrc:
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg',
    alt: 'Nuxt logo'
  },
  {
    href: 'https://nestjs.com/',
    logoSrc:
      'https://upload.wikimedia.org/wikipedia/commons/8/8a/Logo_NestJS.svg',
    alt: 'Nest logo'
  }
]
</script>
<template>
  <footer class="footer bg-base-200 p-5">
    <div>
      <span class="footer-title">Sitemap</span>
      <router-link to="/" class="link link-hover">Homepage</router-link>
      <router-link to="/games" class="link link-hover">Games</router-link>
      <router-link to="/games/tic-tac-toe" class="link link-hover"
        >Tic-tac-toe</router-link
      >
      <router-link to="/games/snake" class="link link-hover">Snake</router-link>
      <router-link to="/leaderboard" class="link link-hover"
        >Leaderboard</router-link
      >
    </div>
    <div>
      <span class="footer-title">Technologies</span>
      <div class="mb-3 flex justify-center gap-x-1.5">
        <a
          v-for="technology in technologies"
          :key="technology.href"
          :href="technology.href"
        >
          <img
            :src="technology.logoSrc"
            :alt="technology.alt"
            class="h-8 grayscale transition-all hover:grayscale-0"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
