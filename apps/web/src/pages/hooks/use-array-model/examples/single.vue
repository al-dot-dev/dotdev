<script lang="ts" setup>
import { useArrayModel } from '@dotdev/ui-kit'
import { ref } from 'vue'

interface Framework {
  id: string
  label: string
}

const frameworks: Framework[] = [
  { id: 'vue', label: 'Vue' },
  { id: 'react', label: 'React' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'solid', label: 'Solid' },
]

const model = ref<Framework>()

const { isSelected, select } = useArrayModel(model, { valueKey: 'id' })
</script>

<template>
  <div>
    <div class="flex w-56 flex-col gap-0.5 rounded-xl border border-default bg-surface p-1">
      <button
        v-for="item in frameworks"
        :key="item.id"
        :class="isSelected(item) ? 'bg-brand-soft text-brand' : 'text-foreground hover:bg-neutral-soft-hover'"
        class="rounded-lg px-3 py-1.5 text-left text-sm"
        @click="select(item)"
      >
        {{ item.label }}
      </button>
    </div>

    <p class="mt-2 font-mono text-xs text-muted">model: {{ model?.label ?? 'undefined' }}</p>
  </div>
</template>
