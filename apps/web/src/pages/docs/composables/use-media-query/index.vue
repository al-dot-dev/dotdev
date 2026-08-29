<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import demo from './examples/demo.vue'

defineDocPage({
  title: 'useMediaQuery',
  icon: 'code',
  description: `A composable that tracks the result of a CSS media query and exposes it as a reactive boolean ref. Pass any valid <code>matchMedia</code> query string; the value updates reactively when the environment crosses the breakpoint, and stops watching on unmount.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Responsive banner',
      description: `Use multiple narrow-width queries to react to the current viewport and swap the copy shown to the visitor.`,
      preview: demo,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
