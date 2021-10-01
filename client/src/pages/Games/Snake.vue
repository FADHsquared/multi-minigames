<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const gridSquareSize = 17
const pixelRows = ref(
  Array.from({ length: gridSquareSize }, () =>
    new Array(gridSquareSize).fill(null)
  )
)

function randomNumberZeroToMax(max: number) {
  return Math.round(Math.random() * max)
}
function randomPixelAsFood(gridSize: number) {
  let randomY: number
  let randomX: number
  do {
    randomY = randomNumberZeroToMax(gridSize - 1)
    randomX = randomNumberZeroToMax(gridSize - 1)
  } while (
    snakeLocations.some(([locX, locY]) => locX === randomX && locY === randomY)
  )

  pixelRows.value[randomY][randomX] = 'food'
}

let snakeLocations: [x: number, y: number][] = [[1, 8]]
randomPixelAsFood(gridSquareSize)

let snakeMovingInterval: number
const interval = 200
const isStatusLost = ref(false)

function updateGrid(snake: [x: number, y: number][]) {
  pixelRows.value = pixelRows.value.map((pixelRow, rowIdx) =>
    pixelRow.map((pixel, pixelIdx) => {
      if (snake.some(([x, y]) => x === pixelIdx && y === rowIdx)) return 'snake'
      if (pixel === 'food') return 'food'
    })
  )
}
updateGrid(snakeLocations)
const moves = {
  w() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      const [prevX, prevY] = snakeLocations[snakeLocations.length - 1]
      if (
        snakeLocations.some(
          ([xLoc, yLoc]) => prevX === xLoc && prevY - 1 === yLoc
        )
      ) {
        isStatusLost.value = true
        clearInterval(snakeMovingInterval)
        return
      }
      if (pixelRows.value[prevY - 1][prevX] === 'food') {
        snakeLocations = [...snakeLocations, [prevX, prevY - 1]]
        randomPixelAsFood(gridSquareSize)
      } else {
        snakeLocations = [
          ...snakeLocations.slice(1, snakeLocations.length),
          [prevX, prevY - 1]
        ]
      }
      updateGrid(snakeLocations)
    }, interval)
  },
  s() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      const [prevX, prevY] = snakeLocations[snakeLocations.length - 1]
      if (
        snakeLocations.some(
          ([xLoc, yLoc]) => prevX === xLoc && prevY + 1 === yLoc
        )
      ) {
        isStatusLost.value = true
        clearInterval(snakeMovingInterval)
        return
      }
      if (pixelRows.value[prevY + 1][prevX] === 'food') {
        snakeLocations = [...snakeLocations, [prevX, prevY + 1]]
        randomPixelAsFood(gridSquareSize)
      } else {
        snakeLocations = [
          ...snakeLocations.slice(1, snakeLocations.length),
          [prevX, prevY + 1]
        ]
      }
      updateGrid(snakeLocations)
    }, interval)
  },
  a() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      const [prevX, prevY] = snakeLocations[snakeLocations.length - 1]
      if (
        snakeLocations.some(
          ([xLoc, yLoc]) => prevX - 1 === xLoc && prevY === yLoc
        )
      ) {
        isStatusLost.value = true
        clearInterval(snakeMovingInterval)
        return
      }
      if (pixelRows.value[prevY][prevX - 1] === 'food') {
        snakeLocations = [...snakeLocations, [prevX - 1, prevY]]
        randomPixelAsFood(gridSquareSize)
      } else {
        snakeLocations = [
          ...snakeLocations.slice(1, snakeLocations.length),
          [prevX - 1, prevY]
        ]
      }
      updateGrid(snakeLocations)
    }, interval)
  },
  d() {
    clearInterval(snakeMovingInterval)
    snakeMovingInterval = setInterval(() => {
      const [prevX, prevY] = snakeLocations[snakeLocations.length - 1]
      if (
        snakeLocations.some(
          ([xLoc, yLoc]) => prevX + 1 === xLoc && prevY === yLoc
        )
      ) {
        isStatusLost.value = true
        clearInterval(snakeMovingInterval)
        return
      }
      if (pixelRows.value[prevY][prevX + 1] === 'food') {
        snakeLocations = [...snakeLocations, [prevX + 1, prevY]]
        randomPixelAsFood(gridSquareSize)
      } else {
        snakeLocations = [
          ...snakeLocations.slice(1, snakeLocations.length),
          [prevX + 1, prevY]
        ]
      }
      updateGrid(snakeLocations)
    }, interval)
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key in moves && !isStatusLost.value) {
    moves[e.key as 'w' | 's' | 'a' | 'd']()
  }
}
window.addEventListener('keydown', handleKeydown)

function handleResetPress() {
  pixelRows.value = Array.from({ length: gridSquareSize }, () =>
    new Array(gridSquareSize).fill(null)
  )
  snakeLocations = [[1, 8]]
  updateGrid(snakeLocations)
  randomPixelAsFood(gridSquareSize)
  isStatusLost.value = false
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  clearInterval(snakeMovingInterval)
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
