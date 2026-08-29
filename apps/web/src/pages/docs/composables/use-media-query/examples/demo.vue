<script lang="ts" setup>
import { useMediaQuery } from '@dotdev/ui-kit'

const isNarrow = useMediaQuery('(max-width: 640px)')
const isCompact = useMediaQuery('(max-width: 480px)')
</script>

<template>
  <div
    class="rounded-xl border px-4 py-3"
    :class="isNarrow ? 'border-brand-soft bg-brand-soft text-on-brand' : 'border-default bg-surface'"
  >
    <p class="text-sm font-semibold text-foreground">
      {{ isCompact ? 'Compact' : isNarrow ? 'Narrow' : 'Wide' }} viewport
    </p>
    <p class="mt-1 text-xs text-muted">
      Resize the window — <code class="font-mono">(max-width: 480px)</code> and
      <code class="font-mono">(max-width: 640px)</code> are tracked reactively.
    </p>
  </div>
</template>
