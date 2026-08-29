<script lang="ts" setup>
import { useClickOutside } from '@dotdev/ui-kit'
import { ref } from 'vue'

const open = ref(false)
const panel = ref<HTMLElement | null>(null)

useClickOutside(
  panel,
  () => {
    open.value = false
  },
  open,
)
</script>

<template>
  <div>
    <button class="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-on-brand" @click="open = !open">
      {{ open ? 'Close' : 'Open popover' }}
    </button>

    <div v-if="open" ref="panel" class="mt-2 w-56 rounded-xl border border-default bg-surface p-3 text-sm shadow-lg">
      Press anywhere outside this panel to dismiss it.
    </div>
  </div>
</template>
