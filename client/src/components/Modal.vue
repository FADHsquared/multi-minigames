<script setup lang="ts">
defineProps<{
  title: string
  handleOutsideAreaClick: ((payload: MouseEvent) => void) | undefined
}>()
</script>

<template>
  <div
    class="
      absolute
      w-full
      h-full
      bg-black/50
      flex flex-col
      items-center
      justify-center
    "
    @click.self="handleOutsideAreaClick"
  >
    <div
      class="
        bg-gray-50
        dark:bg-gray-800
        border-4 border-yellow-600
        rounded-xl
        p-1.5
        divide-y-2 divide-gray-400
      "
    >
      <h3 class="text-2xl mb-1.5 font-semibold text-center">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>
