<script lang="ts" setup>
import { useTypeahead } from '@dotdev/ui-kit'
import { ref } from 'vue'

const items = [
  { label: 'Alpha', disabled: false },
  { label: 'Beta', disabled: true },
  { label: 'Charlie', disabled: false },
  { label: 'Chicago', disabled: true },
  { label: 'Delta', disabled: false },
]

const currentIndex = ref(-1)

const { search, searchQuery } = useTypeahead({
  options: items,
  getLabel: (item) => item.label,
  isDisabled: (item) => item.disabled,
  getCurrentIndex: () => currentIndex.value,
  onMatch: (index) => {
    currentIndex.value = index
  },
})
</script>

<template>
  <div>
    <div
      class="flex w-56 flex-col gap-0.5 rounded-xl border border-default bg-surface p-1 outline-none focus:border-brand"
      tabindex="0"
      @keydown.prevent="search($event.key)"
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

    <p class="mt-2 font-mono text-xs text-muted">query: "{{ searchQuery }}" — try typing "c"</p>
  </div>
</template>
