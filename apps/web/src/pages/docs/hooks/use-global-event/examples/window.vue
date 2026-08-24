<script lang="ts" setup>
import { useGlobalEvent } from '@dotdev/ui-kit'
import { ref } from 'vue'

const position = ref({ x: 0, y: 0 })

useGlobalEvent(
  'mousemove',
  (event) => {
    position.value = { x: event.clientX, y: event.clientY }
  },
  { target: window },
)
</script>

<template>
  <p class="font-mono text-xs text-muted">cursor: x={{ position.x }}, y={{ position.y }} — move the mouse</p>
</template>
