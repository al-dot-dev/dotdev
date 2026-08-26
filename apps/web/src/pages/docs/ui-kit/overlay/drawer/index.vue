<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import placement from './examples/placement.vue'
import canClose from './examples/canClose.vue'

defineDocPage({
  title: 'Drawer',
  icon: 'stack',
  styleScope: 'drawer',
  description: `A panel that slides in from an edge of the screen. Supports multiple placements, custom header and footer slots, async close confirmation, and programmatic control via template ref.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the drawer visibility. The drawer includes a header, body, and footer with a close button.`,
      preview: basic,
    },
    {
      title: 'Placement',
      description: `Use the <code>placement</code> prop to control which edge the drawer slides from. Available placements: <code>left</code> (default), <code>right</code>, <code>top</code>, and <code>bottom</code>.`,
      preview: placement,
    },
    {
      title: 'Close confirmation',
      description: `Use the <code>can-close</code> prop to provide an async function that controls whether the drawer can be closed. Returns <code>true</code> to allow closing, <code>false</code> to prevent it.`,
      preview: canClose,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
