<script lang="ts" setup>
import { useFloating } from '@dotdev/ui-kit'
import { ref } from 'vue'

const open = ref(false)
const anchor = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

const { styles, placement } = useFloating(anchor, floating, {
  placement: 'top',
  offset: 8,
  autoUpdate: true,
})
</script>

<template>
  <div class="relative flex justify-center py-12">
    <button
      ref="anchor"
      class="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-on-brand"
      @click="open = !open"
    >
      Toggle popover
    </button>

    <div
      v-if="open"
      ref="floating"
      :style="styles"
      class="z-10 w-48 rounded-xl border border-default bg-surface p-3 text-xs shadow-lg"
    >
      Positioned with Floating UI — resolved placement: <b>{{ placement }}</b>
    </div>
  </div>
</template>
