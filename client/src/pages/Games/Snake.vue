<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { SnakeGame } from '../../modules/game-logic/game-logic'

const snakeGame = new SnakeGame(17)

const pixelRows = ref(snakeGame.getPlayArea())
const isStatusLost = ref(snakeGame.getIsLost())

const moves: { [key: string]: 'up' | 'down' | 'left' | 'right' } = {
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right'
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key in moves) {
    snakeGame.performContinuousMove(moves[e.key], () => {
      pixelRows.value = snakeGame.getPlayArea()
      isStatusLost.value = snakeGame.getIsLost()
    })
  }
}
window.addEventListener('keydown', handleKeydown)

function handleResetPress() {
  snakeGame.resetPlayArea()
  pixelRows.value = snakeGame.getPlayArea()
  isStatusLost.value = snakeGame.getIsLost()
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  snakeGame.close()
})
</script>

<template>
  <main class="flex-grow flex flex-col items-center justify-center gap-y-2">
    <p v-if="isStatusLost">
      You hit yourself!<button
        class="border-2 border-yellow-600 rounded"
        @click="handleResetPress"
      >
        Reset
      </button>
    </p>
    <div class="border-4 border-yellow-600 rounded-xl p-2 flex flex-col">
      <div
        v-for="(pixelRow, pixelRowIdx) in pixelRows"
        :key="pixelRowIdx"
        class="flex"
      >
        <div
          v-for="(pixel, pixelIdx) in pixelRow"
          :key="pixelIdx"
          class="w-4 h-4 rounded border-2 border-gray-400/10"
          :class="{
            'bg-gray-300': pixel === 'food',
            'bg-gray-400': pixel === 'snake'
          }"
        ></div>
      </div>
    </div>
  </main>
</template>
