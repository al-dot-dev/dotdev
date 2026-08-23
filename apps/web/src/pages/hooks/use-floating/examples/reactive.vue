<script lang="ts" setup>
import { useFloating } from '@dotdev/ui-kit'
import { ref } from 'vue'

const placements = ['top', 'right', 'bottom', 'left'] as const

const placement = ref<(typeof placements)[number]>('bottom')

const anchor = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

const { styles } = useFloating(anchor, floating, () => ({
  placement: placement.value,
  offset: 8,
}))
</script>

<template>
  <div class="flex justify-center py-16">
    <div class="relative">
      <div class="mb-2 flex justify-center gap-1.5">
        <button
          v-for="value in placements"
          :key="value"
          :class="placement === value ? 'bg-brand text-on-brand' : 'bg-neutral-soft text-muted'"
          class="rounded-lg px-2.5 py-1 text-xs font-medium"
          @click="placement = value"
        >
          {{ value }}
        </button>
      </div>

      <button ref="anchor" class="rounded-lg bg-neutral text-on-neutral px-4 py-2 text-sm font-medium">
        Anchor
      </button>

      <div
        ref="floating"
        :style="styles"
        class="z-10 rounded-lg border border-default bg-surface px-3 py-1.5 text-xs shadow-lg"
      >
        {{ placement }}
      </div>
    </div>
  </div>
</template>
