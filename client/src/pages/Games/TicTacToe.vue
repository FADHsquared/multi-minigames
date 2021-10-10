<script setup lang="ts">
const props = defineProps<{
  room: string
}>()

import type { TicTacToeTurnPayload } from '../../../../types'

import type { Socket } from 'socket.io-client'

import { useRouter } from 'vue-router'
import { ref, inject, onUnmounted, watchEffect } from 'vue'
import { X, Circle } from 'lucide-vue-next'
import Modal from '../../components/Modal.vue'

const router = useRouter()
const socket = inject('socket') as Socket

socket.on('send-turn', (turnData: TicTacToeTurnPayload) => {
  board.value[turnData.position[0]][turnData.position[1]] =
    turnData.currentTurnIsO ? 'o' : 'x'
  currentTurnIsO.value = !turnData.currentTurnIsO

  checkWinCases()
})
socket.on('send-reset', () => {
  resetBoard()
})

const isOnlineMode = ref(!!props.room.length)
function updateIsOnlineModeValue() {
  isOnlineMode.value = !!props.room.length
}
watchEffect(() => {
  if (props.room.length) {
    socket.connect()
    socket.emit('request-join-room', props.room, (response: string) => {
      if (response === 'denied') {
        showModal.value = true
      }
    })
  } else {
    socket.disconnect()
  }
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

function checkDiagonalWinCaseOf(playerLetter: 'x' | 'o') {
  if (
    board.value.every(
      (row, rowIdx) => board.value[rowIdx][rowIdx] === playerLetter
    ) ||
    board.value.every(
      (row, rowIdx) =>
        board.value[rowIdx][board.value.length - rowIdx - 1] === playerLetter
    )
  )
    winner.value = playerLetter
}
function checkWinCases() {
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

  checkDiagonalWinCaseOf('x')
  checkDiagonalWinCaseOf('o')
}

function handleEntryClick(rowIdx: number, entryIdx: number) {
  if (!board.value[rowIdx][entryIdx] && !winner.value) {
    socket.emit('send-turn', <TicTacToeTurnPayload>{
      currentTurnIsO: currentTurnIsO.value,
      position: [rowIdx, entryIdx],
      toRoom: props.room
    })
    board.value[rowIdx][entryIdx] = currentTurnIsO.value ? 'o' : 'x'
    currentTurnIsO.value = !currentTurnIsO.value

    checkWinCases()
  }
}
function resetBoard() {
  board.value = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  winner.value = null
  currentTurnIsO.value = false
}
function handleResetClick() {
  socket.emit('send-reset', props.room)
  resetBoard()
}

const isRequestingOnline = ref(false)
const roomCodeInputRef = ref<null | HTMLInputElement>(null)
const roomCode = ref('')

function handleOnlineClick() {
  if (!props.room.length) {
    isRequestingOnline.value = true
    setTimeout(() => {
      roomCodeInputRef.value?.focus()
    }, 0)
  }
}
function handleFocusOut() {
  isRequestingOnline.value = false
}
function handleRoomCodeSubmit() {
  if (roomCode.value.length) {
    isRequestingOnline.value = false
    router
      .push(`/games/tic-tac-toe/${roomCode.value}`)
      .then(updateIsOnlineModeValue)
    handleResetClick()
  }
}

function handleOfflineClick() {
  if (props.room.length) {
    router.push('/games/tic-tac-toe').then(updateIsOnlineModeValue)
    handleResetClick()
  }
}

onUnmounted(() => {
  socket.off()
  socket.disconnect()
})

const showModal = ref(false)
function handleCloseModal() {
  showModal.value = false
  router.replace('/games/tic-tac-toe').then(updateIsOnlineModeValue)
}
</script>

<template>
  <Modal
    title="Room Join Error"
    :is-open="showModal"
    @outside-area-click="handleCloseModal"
  >
    <p class="text-center">This room already has two players in it!</p>
  </Modal>
  <main
    class="
      mt-1.5
      my-3
      flex-grow flex flex-col
      items-center
      justify-center
      gap-y-2
    "
  >
    <p>Mode:</p>
    <div class="btn-group">
      <button
        :class="{ 'btn-active': !isOnlineMode }"
        class="btn"
        @click="handleOfflineClick"
      >
        Offline
      </button>
      <button
        :class="{ 'btn-active': isOnlineMode }"
        class="btn"
        @click="handleOnlineClick"
      >
        Online
      </button>
    </div>
    <div class="card bg-base-200">
      <form
        v-show="isRequestingOnline"
        class="card-body form-control"
        @submit.prevent="handleRoomCodeSubmit"
      >
        <p>Enter a room code, press enter to go:</p>
        <input
          ref="roomCodeInputRef"
          v-model="roomCode"
          type="text"
          class="input w-full"
          @focusout="handleFocusOut"
        />
      </form>
    </div>
    <p v-if="winner">{{ winner }} won!</p>
    <div class="w-max divide-y-2 divide-base-300">
      <div
        v-for="(row, rowIdx) in board"
        :key="rowIdx"
        class="divide-x-2 divide-base-300"
      >
        <button
          v-for="(entry, entryIdx) in row"
          :key="entryIdx"
          class="align-bottom w-20 h-20 inline-flex items-center justify-center"
          @click="handleEntryClick(rowIdx, entryIdx)"
        >
          <Circle v-if="entry === 'o'" :size="36" />
          <X v-if="entry === 'x'" :size="36" />
        </button>
      </div>
    </div>
    <button class="btn mt-1.5" @click="handleResetClick">Reset Board</button>
  </main>
</template>
