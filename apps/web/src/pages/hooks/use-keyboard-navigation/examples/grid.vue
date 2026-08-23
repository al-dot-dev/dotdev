<script lang="ts" setup>
import { useKeyboardNavigation } from '@dotdev/ui-kit'
import { ref } from 'vue'

const items = ref<{ label: string; disabled: boolean }[]>([
  { label: 'Alpha', disabled: false },
  { label: 'Beta', disabled: true },
  { label: 'Gamma', disabled: false },
  { label: 'Delta', disabled: false },
  { label: 'Epsilon', disabled: true },
  { label: 'Zeta', disabled: false },
  { label: 'Eta', disabled: false },
  { label: 'Theta', disabled: false },
  { label: 'Iota', disabled: false },
  { label: 'Kappa', disabled: true },
  { label: 'Lambda', disabled: false },
  { label: 'Mu', disabled: false },
  { label: 'Nu', disabled: false },
  { label: 'Xi', disabled: false },
  { label: 'Omicron', disabled: false },
  { label: 'Pi', disabled: false },
  { label: 'Pi 3', disabled: false },
  { label: 'Pi 3', disabled: false },
])

const columns = 4

const { currentIndex, currentItem, setCurrentIndex, onKeydown } = useKeyboardNavigation(items, {
  columns,
  edgeX: 'auto',
  edgeY: 'auto',
  isSkipped: (item) => item.disabled,
})
</script>

<template>
  <div>
    <div
      class="grid w-max grid-cols-4 gap-2 rounded-xl border border-default bg-surface p-2 outline-none transition-[border-color] focus:border-brand"
      tabindex="0"
      @blur="setCurrentIndex(-1)"
      @keydown="onKeydown"
    >
      <div
        v-for="(item, index) in items"
        :key="item.label"
        :class="
          item.disabled
            ? 'cursor-not-allowed text-placeholder'
            : index === currentIndex
              ? 'ring-2 ring-brand'
              : ''
        "
        class="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-neutral-soft text-xs font-medium text-foreground"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>

    <p class="mt-2 font-mono text-xs text-muted">Current: {{ currentItem?.label ?? 'none' }}</p>
  </div>
</template>
