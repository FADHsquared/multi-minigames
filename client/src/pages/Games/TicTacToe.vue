<script setup lang="ts">
import type { TicTacToeTurnPayload } from '../../../../types'

import type { Socket } from 'socket.io-client'

import { ref, inject, onUnmounted } from 'vue'
import { X, Circle } from 'lucide-vue-next'

const socket = inject<Socket>('socket')
// RESTRUCTURE SOCKET.IO THINGS LATER
// socket?.connect()

socket?.on('send-turn', (turnData: TicTacToeTurnPayload) => {
  console.log(turnData)
})

type Entry = null | 'x' | 'o'
type Board = Entry[][]

const board = ref<Board>([
  [null, null, null],
  [null, null, null],
  [null, null, null]
])
const currentTurnIsO = ref(false)
const winner = ref<Entry>(null)

function allRowsAreFilledWith(board: Board, fillingEntry: Entry) {
  return board.some((row) => row.every((entry) => entry === fillingEntry))
}

function handleEntryClick(rowIdx: number, entryIdx: number) {
  if (!board.value[rowIdx][entryIdx] && !winner.value) {
    socket?.emit('send-turn', {
      currentTurnIsO: currentTurnIsO.value,
      position: [rowIdx, entryIdx]
    })
    board.value[rowIdx][entryIdx] = currentTurnIsO.value ? 'o' : 'x'
    currentTurnIsO.value = !currentTurnIsO.value

    const rotated90DegsBoard: Board = [[], [], []]
    board.value.forEach((row, rowIdx) => {
      row.forEach((entry, entryIdx) => {
        rotated90DegsBoard[entryIdx][rowIdx] = entry
      })
    })

    if (
      allRowsAreFilledWith(board.value, 'o') ||
      allRowsAreFilledWith(rotated90DegsBoard, 'o')
    )
      winner.value = 'o'
    if (
      allRowsAreFilledWith(board.value, 'x') ||
      allRowsAreFilledWith(rotated90DegsBoard, 'x')
    )
      winner.value = 'x'

    // Diagonal win case
    if (
      board.value.every((row, rowIdx) => board.value[rowIdx][rowIdx] === 'o') ||
      board.value.every(
        (row, rowIdx) =>
          board.value[rowIdx][board.value.length - rowIdx - 1] === 'o'
      )
    )
      winner.value = 'o'
    if (
      board.value.every((row, rowIdx) => board.value[rowIdx][rowIdx] === 'x') ||
      board.value.every(
        (row, rowIdx) =>
          board.value[rowIdx][board.value.length - rowIdx - 1] === 'x'
      )
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
  currentTurnIsO.value = false
}
function handleOnlineClick() {
  handleResetClick()
}

onUnmounted(() => {
  socket?.disconnect()
})
</script>

<template>
  <main class="flex-grow flex flex-col items-center justify-center gap-y-2">
    <p>Mode:</p>
    <div class="border-2 border-gray-400">
      <button>Offline</button>
      <button @click="handleOnlineClick">Online</button>
    </div>

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
          class="align-bottom w-20 h-20 inline-flex items-center justify-center"
          @click="handleEntryClick(rowIdx, entryIdx)"
        >
          <Circle v-if="entry === 'o'" size="36" />
          <X v-if="entry === 'x'" size="36" />
        </button>
      </div>
    </div>
    <button
      class="px-1 border-2 border-yellow-600 rounded-md active:bg-blue-600/25"
      @click="handleResetClick"
    >
      Reset Board
    </button>
  </main>
</template>
