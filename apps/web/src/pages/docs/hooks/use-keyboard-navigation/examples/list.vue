<script lang="ts" setup>
import { useKeyboardNavigation } from '@dotdev/ui-kit'
import { ref } from 'vue'

const items = ref([
  { label: 'Alpha', disabled: false },
  { label: 'Beta', disabled: true },
  { label: 'Gamma', disabled: false },
  { label: 'Delta', disabled: false },
  { label: 'Epsilon', disabled: true },
  { label: 'Zeta', disabled: false },
])

const { currentIndex, currentItem, setCurrentIndex, onKeydown } = useKeyboardNavigation(items, {
  isSkipped: (item) => item.disabled,
})
</script>

<template>
  <div>
    <div
      class="flex w-56 flex-col gap-0.5 rounded-xl border border-default bg-surface p-1 outline-none transition-[border-color] focus:border-brand"
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
              ? 'bg-neutral-soft text-foreground'
              : 'text-foreground'
        "
        class="rounded-lg px-3 py-1.5 text-sm"
      >
        {{ item.label }}
      </div>
    </div>

    <p class="mt-2 font-mono text-xs text-muted">Current: {{ currentItem?.label ?? 'none' }}</p>
  </div>
</template>
