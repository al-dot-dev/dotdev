<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import placement from './examples/placement.vue'
import slots from './examples/slots.vue'
import canClose from './examples/canClose.vue'

defineDocPage({
  title: 'Dialog',
  icon: 'stack',
  styleScope: 'dialog',
  description: `A modal overlay that appears on top of the current page. Supports multiple placements, custom header and footer slots, async close confirmation, and programmatic control via template ref.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the dialog visibility. The dialog includes a header, body, and footer with a close button.`,
      preview: basic,
    },
    {
      title: 'Placement',
      description: `Use the <code>placement</code> prop to control the dialog position. Available placements: <code>center</code> (default), <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>, and corner variants.`,
      preview: placement,
    },
    {
      title: 'Custom slots',
      description: `Use the <code>header</code>, <code>default</code>, and <code>footer</code> slots to fully customize the dialog content and layout.`,
      preview: slots,
    },
    {
      title: 'Close confirmation',
      description: `Use the <code>can-close</code> prop to provide an async function that controls whether the dialog can be closed. Returns <code>true</code> to allow closing, <code>false</code> to prevent it.`,
      preview: canClose,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
