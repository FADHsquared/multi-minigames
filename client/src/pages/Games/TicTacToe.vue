<script setup lang="ts">
import { ref } from 'vue'

const board = ref<('x' | 'o' | null)[][]>([
  [null, null, null],
  [null, null, null],
  [null, null, null]
])
const currentTurnIsO = ref(false)

function handleEntryClick(row: number, entry: number) {
  board.value[row][entry] = currentTurnIsO.value ? 'o' : 'x'
  currentTurnIsO.value = !currentTurnIsO.value
}
</script>

<template>
  <p>tic tac toe works!</p>
  <div v-for="row in board">
    <button
      v-for="entry in row"
      class="w-8 h-8 border-2"
      @click="handleEntryClick(board.indexOf(row), row.indexOf(entry))"
    >
      {{ entry }}
    </button>
  </div>
</template>
