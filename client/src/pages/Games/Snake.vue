<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const gridSquareSize = 30
const pixelRows = ref(
  Array.from({ length: gridSquareSize }, () =>
    new Array(gridSquareSize).fill(null)
  )
)

function randomNumberZeroToMax(max: number) {
  return Math.round(Math.random() * max)
}
function randomPixelAsFood(gridSize: number) {
  pixelRows.value[randomNumberZeroToMax(gridSize - 1)][
    randomNumberZeroToMax(gridSize - 1)
  ] = 'food'
}
randomPixelAsFood(gridSquareSize)

let snakeHeadLocationY = 1
let snakeHeadLocationX = 1

pixelRows.value[snakeHeadLocationY][snakeHeadLocationX] = 'snake'
let snakeMovingInterval: number
const interval = 500

const moves = {
  w() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      console.log('Moving W!')
    }, interval)
  },
  s() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      console.log('Moving S!')
    }, interval)
  },
  a() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      console.log('Moving A!')
    }, interval)
  },
  d() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      console.log('Moving D!')
      snakeHeadLocationX += 1
      pixelRows.value[snakeHeadLocationY][snakeHeadLocationX] = 'snake'
    }, interval)
  }
}

function handleKeydown(e: KeyboardEvent) {
  console.log(e.key)
  moves[e.key]()
}
window.addEventListener('keydown', handleKeydown)

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <main class="flex-grow flex flex-col items-center justify-center gap-y-2">
    <div
      class="border-4 border-yellow-600 rounded-xl p-2 flex flex-col gap-y-0.5"
    >
      <div
        v-for="(pixelRow, pixelRowIdx) in pixelRows"
        :key="pixelRowIdx"
        class="flex gap-x-0.5"
      >
        <div
          v-for="(pixel, pixelIdx) in pixelRow"
          :key="pixelIdx"
          class="w-4 h-4 border-2 border-gray-400 rounded"
          :class="{
            'bg-gray-300': pixel === 'food',
            'bg-gray-400': pixel === 'snake'
          }"
        ></div>
      </div>
    </div>
  </main>
</template>
