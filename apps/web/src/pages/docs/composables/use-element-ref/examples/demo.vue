<script lang="ts" setup>
import { useElementRef } from '@dotdev/ui-kit'

const panel = useElementRef<HTMLElement>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-bind="panel" class="rounded-xl border border-default bg-surface px-4 py-3">
      <p class="text-sm font-medium text-foreground">Bound element</p>
      <p class="mt-1 text-xs text-muted">
        This block exposes its DOM node through the ref — read it below.
      </p>
    </div>

    <p class="text-sm text-muted">
      Real element tag: <code class="font-mono">{{ panel.value?.tagName ?? '—' }}</code>
    </p>
  </div>
</template>
