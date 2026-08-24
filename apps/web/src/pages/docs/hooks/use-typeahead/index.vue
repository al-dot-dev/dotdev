<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import disabled from './examples/disabled.vue'

defineDocPage({
  title: 'useTypeahead',
  icon: 'code',
  description: `A composable that implements type-ahead search over a list of options. Feed it printable keys through <code>search()</code>, it accumulates a query with the given <code>timeout</code>, finds the next option whose label starts with the query — starting after <code>getCurrentIndex()</code> and wrapping around — and reports matches via <code>onMatch</code>. Disabled options are skipped.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic type-ahead',
      description: `Focus the list and start typing. The current query is exposed as <code>searchQuery</code> and resets automatically after the timeout (500ms by default), so typing "ch" then "d" searches fresh.`,
      preview: basic,
    },
    {
      title: 'Skipping disabled options',
      description: `Provide <code>isDisabled</code> to exclude entries from matching entirely — the search jumps over them instead of landing on an unavailable item.`,
      preview: disabled,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
