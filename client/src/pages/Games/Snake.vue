<script setup lang="ts">
import type { PlayArea } from '../../modules/game-logic/game-logic'
import { ref, onUnmounted } from 'vue'
import { SnakeGame } from '../../modules/game-logic/game-logic'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-vue-next'

const snakeGame = new SnakeGame(17)

const pixelRows = ref<null | PlayArea>(null)
const isStatusLost = ref<null | boolean>(null)

snakeGame.onUpdateEvents(() => {
  pixelRows.value = snakeGame.getPlayArea()
  isStatusLost.value = snakeGame.getIsLost()
})

const moves: { [key: string]: 'up' | 'down' | 'left' | 'right' } = {
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key in moves) {
    snakeGame.performContinuousMove(moves[e.key])
  }
}
window.addEventListener('keydown', handleKeydown)

function handleResetPress() {
  snakeGame.resetPlayArea()
}

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

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
    <div
      v-if="pixelRows"
      class="border-4 border-yellow-600 rounded-xl p-2 flex flex-col"
    >
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
    <div v-if="isMobile">
      <div class="w-max mx-auto">
        <button
          class="border-2 border-gray-400 p-2"
          @click="snakeGame.performContinuousMove('up')"
        >
          <ChevronUp />
        </button>
      </div>
      <div class="flex gap-x-11">
        <button
          class="border-2 border-gray-400 p-2"
          @click="snakeGame.performContinuousMove('left')"
        >
          <ChevronLeft />
        </button>
        <button
          class="border-2 border-gray-400 p-2"
          @click="snakeGame.performContinuousMove('right')"
        >
          <ChevronRight />
        </button>
      </div>
      <div class="w-max mx-auto">
        <button
          class="border-2 border-gray-400 p-2"
          @click="snakeGame.performContinuousMove('down')"
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  </main>
</template>
