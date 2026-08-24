<script lang="ts" setup>
import { useClipboard } from '@dotdev/ui-kit'
import { ref } from 'vue'

const snippets = ['bun install', 'bun run dev', 'bun run build']

const { copy } = useClipboard(undefined, { copiedDuration: 1500 })

const lastCopied = ref<string | null>(null)

async function onCopy(snippet: string) {
  if (await copy(snippet)) {
    lastCopied.value = snippet
  }
}
</script>

<template>
  <div class="flex w-64 flex-col gap-1.5">
    <div v-for="snippet in snippets" :key="snippet" class="flex items-center gap-2">
      <code class="flex-1 font-mono text-xs">{{ snippet }}</code>
      <button
        :class="lastCopied === snippet ? 'bg-success text-on-success' : 'bg-neutral-soft text-muted'"
        class="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium"
        @click="onCopy(snippet)"
      >
        {{ lastCopied === snippet ? 'Copied!' : 'Copy' }}
      </button>
    </div>
  </div>
</template>
