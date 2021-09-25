<script setup lang="ts">
import { ref } from 'vue'
import { X, Circle } from 'lucide-vue-next'

type Entry = null | 'x' | 'o'
type Board = Entry[][]

const board = ref<Board>([
  [null, null, null],
  [null, null, null],
  [null, null, null]
])
const currentTurnIsO = ref(false)
const winner = ref<Entry>(null)

function handleEntryClick(rowIdx: number, entryIdx: number) {
  if (!board.value[rowIdx][entryIdx] && !winner.value) {
    board.value[rowIdx][entryIdx] = currentTurnIsO.value ? 'o' : 'x'
    currentTurnIsO.value = !currentTurnIsO.value

    const rotated90DegsBoard: Board = [[], [], []]
    board.value.forEach((row, rowIdx) => {
      row.forEach((entry, entryIdx) => {
        rotated90DegsBoard[entryIdx][rowIdx] = entry
      })
    })

    if (
      board.value.some((row) => row.every((entry) => entry === 'o')) ||
      rotated90DegsBoard.some((row) => row.every((entry) => entry === 'o'))
    )
      winner.value = 'o'
    if (
      board.value.some((row) => row.every((entry) => entry === 'x')) ||
      rotated90DegsBoard.some((row) => row.every((entry) => entry === 'x'))
    )
      winner.value = 'x'
  }
}
function handleResetClick() {
  board.value = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  winner.value = null
}
</script>

<template>
  <main class="flex-grow flex flex-col items-center justify-center gap-y-2">
    <p v-if="winner">{{ winner }} won!</p>
    <div class="w-max divide-y-2 divide-gray-400">
      <div
        v-for="(row, rowIdx) in board"
        :key="rowIdx"
        class="divide-x-2 divide-gray-400"
      >
        <button
          v-for="(entry, entryIdx) in row"
          :key="entryIdx"
          class="align-bottom w-16 h-16 inline-flex items-center justify-center"
          @click="handleEntryClick(rowIdx, entryIdx)"
        >
          <Circle v-if="entry === 'o'" />
          <X v-if="entry === 'x'" />
        </button>
      </div>
    </div>
    <button
      class="px-1 border-2 border-gray-400 active:bg-blue-600/25"
      @click="handleResetClick"
    >
      Reset Board
    </button>
  </main>
</template>
