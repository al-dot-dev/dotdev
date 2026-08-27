<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'
import counter from './examples/counter.vue'
import dot from './examples/dot.vue'
import slots from './examples/slots.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Badge',
  icon: 'component-1',
  styleScope: 'badge',
  description: `A small status indicator or label. Supports six semantic colors, soft and solid variants, and an optional dot indicator for inline status marks.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use the <code>label</code> prop to render text inside the badge, or pass content via the default slot.`,
      preview: base,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to switch between <code>soft</code> (default) and <code>solid</code> styles.`,
      preview: variants,
    },
    {
      title: 'Dot indicator',
      description: `Set the <code>dot</code> prop to display a small colored circle before the text. Combine with <code>ring</code> for a ring-only status mark.`,
      preview: dot,
    },
    {
      title: 'Counter',
      description: `Use the default slot to render numeric values inside the badge. Combine with <code>label</code> for a text prefix, or with <code>dot</code> and <code>variant</code> for different styles.`,
      preview: counter,
    },
    {
      title: 'Slots',
      description: `Use the default slot to render arbitrary content inside the badge. Combine with <code>label</code> for a prefix.`,
      preview: slots,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
