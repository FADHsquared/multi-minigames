<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Axios } from 'axios'
import type { LeaderboardJSON } from '../../../types'

const axios = inject('axios') as Axios

const leaderboard = ref<LeaderboardJSON | null>(null)
async function getLeaderboard() {
  const response = await axios.get(
    `http://localhost${
      import.meta.env.VITE_SIO_PORT ? `:${import.meta.env.VITE_SIO_PORT}` : ``
    }/api/leaderboard`
  )
  leaderboard.value = response.data
}
getLeaderboard()
</script>

<template>
  <h1 class="my-6 text-center text-4xl font-semibold">Leaderboard</h1>
  <div
    v-if="leaderboard"
    class="container self-center px-4 flex flex-col gap-y-4"
  >
    <div
      v-for="player in leaderboard.data"
      :key="player.name"
      class="card bordered"
    >
      <div class="card-body">
        <h2 class="card-title">{{ player.name }}</h2>
        <p>Points: {{ player.points }}</p>
      </div>
    </div>
  </div>
  <p v-else class="self-center">Loading...</p>
</template>
