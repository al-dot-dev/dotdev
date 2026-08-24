<script lang="ts" setup>
import { useClipboard } from '@dotdev/ui-kit'
import { ref } from 'vue'

const source = ref('npx create-dotdev-app')

const { copy, copied } = useClipboard(source)
</script>

<template>
  <div class="flex items-center gap-2">
    <code class="flex-1 rounded-lg border border-default bg-surface px-3 py-2 font-mono text-xs">{{ source }}</code>
    <button
      :class="copied ? 'bg-success text-on-success' : 'bg-neutral-soft text-foreground'"
      class="shrink-0 rounded-lg px-3 py-2 text-xs font-medium"
      @click="copy()"
    >
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
  </div>
</template>
