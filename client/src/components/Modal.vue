<script setup lang="ts">
defineEmits(['outside-area-click'])
defineProps<{
  title: string
  isOpen: boolean
}>()
</script>

<template>
  <div
    class="modal"
    :class="{ 'modal-open': isOpen }"
    @click.self="$emit('outside-area-click')"
  >
    <div class="modal-box">
      <h3 class="text-2xl mb-1.5 font-semibold text-center">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>
