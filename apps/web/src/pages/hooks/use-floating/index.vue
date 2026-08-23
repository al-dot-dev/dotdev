<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import reactive from './examples/reactive.vue'

defineDocPage({
  title: 'useFloating',
  icon: 'code',
  description: `A thin wrapper around Floating UI that positions a floating element relative to an anchor. Accepts refs or getters for both elements, supports <code>placement</code>, <code>strategy</code>, <code>offset</code> and <code>autoUpdate</code>, applies <code>flip</code> and <code>shift</code> middleware to stay in the viewport and exposes the resolved <code>placement</code> plus positioning <code>styles</code> to bind.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Popover positioning',
      description: `Bind <code>styles</code> to the floating element and render it inside any positioned ancestor. Middleware flips the popover to the opposite side when there is no room above the anchor.`,
      preview: basic,
    },
    {
      title: 'Reactive placement',
      description: `Pass the config as a getter to make it reactive — the composable recomputes whenever the returned object changes. Here switching <code>placement</code> moves the panel around the button.`,
      preview: reactive,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
