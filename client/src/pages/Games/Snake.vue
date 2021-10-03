<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { randomNumberFromZeroToMax } from '../../modules/game-logic/helper'

const gridSquareSize = 17

function getNullArray() {
  return Array.from({ length: gridSquareSize }, () =>
    new Array(gridSquareSize).fill(null)
  )
}

const pixelRows = ref(getNullArray())

function randomPixelAsFood(gridSize: number) {
  let randomY: number
  let randomX: number
  do {
    randomY = randomNumberFromZeroToMax(gridSize - 1)
    randomX = randomNumberFromZeroToMax(gridSize - 1)
  } while (
    snakeLocations.some(([locX, locY]) => locX === randomX && locY === randomY)
  )

  foodLocation = [randomX, randomY]
}

let snakeLocations: [x: number, y: number][] = [[1, 8]]
let foodLocation: [x: number, y: number]
randomPixelAsFood(gridSquareSize)

let snakeMovingInterval: number
const interval = 200
const isStatusLost = ref(false)

function updateGrid(
  snake: [x: number, y: number][],
  isRequiringNewFood: boolean
) {
  pixelRows.value = getNullArray()
  snake.forEach(([x, y]) => {
    pixelRows.value[y][x] = 'snake'
  })
  if (isRequiringNewFood) randomPixelAsFood(gridSquareSize)

  const [foodX, foodY] = foodLocation
  pixelRows.value[foodY][foodX] = 'food'
}
updateGrid(snakeLocations, true)

function setSnakeInterval(offsetX: number, offsetY: number) {
  snakeMovingInterval = setInterval(() => {
    const [prevX, prevY] = snakeLocations[snakeLocations.length - 1]
    let isRequiringNewFood = false
    if (
      snakeLocations.some(
        ([xLoc, yLoc]) => prevX + offsetX === xLoc && prevY + offsetY === yLoc
      )
    ) {
      isStatusLost.value = true
      clearInterval(snakeMovingInterval)
      return
    }
    if (pixelRows.value[prevY + offsetY][prevX + offsetX] === 'food') {
      snakeLocations = [...snakeLocations, [prevX + offsetX, prevY + offsetY]]
      isRequiringNewFood = true
    } else {
      snakeLocations = [
        ...snakeLocations.slice(1, snakeLocations.length),
        [prevX + offsetX, prevY + offsetY]
      ]
    }
    updateGrid(snakeLocations, isRequiringNewFood)
  }, interval)
}
const moves = {
  w() {
    clearInterval(snakeMovingInterval)
    setSnakeInterval(0, -1)
  },
  s() {
    clearInterval(snakeMovingInterval)
    setSnakeInterval(0, 1)
  },
  a() {
    clearInterval(snakeMovingInterval)
    setSnakeInterval(-1, 0)
  },
  d() {
    clearInterval(snakeMovingInterval)
    setSnakeInterval(1, 0)
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key in moves && !isStatusLost.value) {
    moves[e.key as 'w' | 's' | 'a' | 'd']()
  }
}
window.addEventListener('keydown', handleKeydown)

function handleResetPress() {
  pixelRows.value = getNullArray()
  snakeLocations = [[1, 8]]
  updateGrid(snakeLocations, true)
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
