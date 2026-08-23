<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import items from './examples/items.vue'
import source from './examples/source.vue'

defineDocPage({
  title: 'useClipboard',
  icon: 'code',
  description: `A composable that writes text to the clipboard via the native Clipboard API. Accepts a reactive source, exposes <code>pending</code>, <code>copied</code> and <code>error</code> state with an auto-resetting <code>copiedDuration</code>, supports one-off values through <code>copy(value)</code> and reports feature support via <code>isSupported</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Reactive source',
      description: `Bind a source ref once and call <code>copy()</code> without arguments. The <code>copied</code> flag flips back to <code>false</code> automatically after <code>copiedDuration</code> milliseconds (2000 by default).`,
      preview: source,
    },
    {
      title: 'Copy on demand',
      description: `Call <code>copy(value)</code> with an explicit string to copy arbitrary content — handy for lists of snippets sharing a single composable instance.`,
      preview: items,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
