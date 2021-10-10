<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import type { Axios } from 'axios'
import type { LeaderboardJSON } from '../../../types'

const axios = inject('axios') as Axios

const leaderboard = ref<LeaderboardJSON | null>(null)
const showTop = ref(5)
async function getLeaderboard(top: number) {
  const response = await axios.get(
    `http${
      import.meta.env.VITE_SIO_PORT
        ? `://localhost:${import.meta.env.VITE_SIO_PORT}`
        : `s://multi-minigames.herokuapp.com`
    }/api/leaderboard`,
    {
      params: {
        top
      }
    }
  )
  leaderboard.value = response.data
}
watchEffect(() => {
  if (showTop.value >= 1) getLeaderboard(showTop.value)
})
</script>

<template>
  <h1 class="my-6 text-center text-4xl font-semibold">Leaderboard</h1>
  <p class="self-center mb-4">
    Show top:
    <input
      v-model="showTop"
      type="number"
      min="1"
      class="input input-primary ml-2"
    />
  </p>
  <div
    v-if="leaderboard"
    class="container self-center px-4 mb-4 flex flex-col gap-y-4"
  >
    <div
      v-for="player in leaderboard.data"
      :key="player.name"
      class="card bg-base-200"
    >
      <div class="card-body">
        <h2 class="card-title">{{ player.name }}</h2>
        <p>Points: {{ player.points }}</p>
      </div>
    </div>
  </div>
  <p v-else class="self-center">Loading...</p>
</template>
