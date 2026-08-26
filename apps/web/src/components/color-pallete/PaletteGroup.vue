<script lang="ts" setup>
import type { Palette } from './palettes.ts'

defineProps<{
  label: string
  palettes: Palette[]
  active: Palette
}>()

const emit = defineEmits<{
  select: [palette: Palette]
}>()

const previewShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
</script>

<template>
  <div class="px-3 pt-1.5 pb-1 text-xs font-medium uppercase tracking-wider text-muted">{{ label }}</div>

  <button
    v-for="palette in palettes"
    :key="palette.name"
    :class="{ 'bg-brand-soft': active.name === palette.name }"
    class="cursor-pointer flex w-full items-center gap-2.5 rounded-lg pl-3 pr-2 py-2 h-sm text-left text-sm transition-colors hover:bg-brand-soft"
    type="button"
    @click="emit('select', palette)"
  >
    <span class="truncate flex-1 text-muted">{{ palette.name }}</span>

    <span class="flex h-full shrink-0 gap-px">
      <span
        v-for="shade in previewShades"
        :key="shade"
        :style="{ backgroundColor: `var(--color-${palette.name.toLowerCase()}-${shade})` }"
        class="w-4 h-full first:rounded-l-sm last:rounded-r-sm"
      />
    </span>
  </button>
</template>
