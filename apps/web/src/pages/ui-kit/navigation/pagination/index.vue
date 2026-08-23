<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import truncation from './examples/truncation.vue'
import sizes from './examples/sizes.vue'
import disabled from './examples/disabled.vue'
import slots from './examples/slots.vue'

defineDocPage({
  title: 'Pagination',
  icon: 'rows',
  styleScope: 'pagination',
  description: `A navigation control for splitting content across pages. Binds the current page with <code>v-model</code>, computes the page count from <code>total</code> and <code>page-size</code>, and truncates long page ranges with ellipsis.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Bind the current page with <code>v-model</code> and pass <code>total</code> together with <code>page-size</code>. The page count is derived automatically, and out-of-range values are clamped.`,
      preview: basic,
    },
    {
      title: 'Range truncation',
      description: `Long ranges collapse into ellipsis, always keeping the first and last pages visible. Use <code>sibling-count</code> to show more pages around the current one.`,
      preview: truncation,
    },
    {
      title: 'Sizes',
      description: `Use the <code>size</code> prop to adjust the control dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Disabled state',
      description: `The previous and next buttons disable themselves at the boundaries. Set the <code>disabled</code> prop to make the whole control non-interactive.`,
      preview: disabled,
    },
    {
      title: 'Custom content',
      description: `The scoped <code>prev</code>, <code>next</code>, and <code>item</code> slots replace arrow icons and page labels. The <code>ellipsis</code> slot overrides the truncation marker.`,
      preview: slots,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
