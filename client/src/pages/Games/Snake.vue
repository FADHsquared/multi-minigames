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
      You died!<button class="btn ml-1.5" @click="handleResetPress">
        Reset
      </button>
    </p>
    <div v-if="pixelRows" class="card bordered">
      <div class="card-body p-3">
        <div
          v-for="(pixelRow, pixelRowIdx) in pixelRows"
          :key="pixelRowIdx"
          class="flex"
        >
          <div
            v-for="(pixel, pixelIdx) in pixelRow"
            :key="pixelIdx"
            class="w-4 h-4 rounded border-2 border-base-200/30"
            :class="{
              'border-none bg-error': pixel === 'food',
              'border-none bg-primary': pixel === 'snake'
            }"
          ></div>
        </div>
      </div>
      <div v-if="isMobile" class="w-max mx-auto">
        <div class="w-max mx-auto">
          <button class="btn" @click="snakeGame.performContinuousMove('up')">
            <ChevronUp />
          </button>
        </div>
        <div class="flex gap-x-10">
          <button class="btn" @click="snakeGame.performContinuousMove('left')">
            <ChevronLeft />
          </button>
          <button class="btn" @click="snakeGame.performContinuousMove('right')">
            <ChevronRight />
          </button>
        </div>
        <div class="w-max mx-auto">
          <button class="btn" @click="snakeGame.performContinuousMove('down')">
            <ChevronDown />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
