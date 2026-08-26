<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import variants from './examples/variants.vue'
import disabled from './examples/disabled.vue'
import indicator from './examples/indicator.vue'
import toggle from './examples/toggle.vue'
import custom from './examples/custom.vue'

defineDocPage({
  title: 'Accordion',
  icon: 'stack',
  styleScope: 'accordion',
  description: `A vertically stacked list of interactive headers that reveal or hide associated content panels. Supports single or multiple open panels, four visual variants, scoped slots for custom headers, content, and indicators, and programmatic control via exposed methods.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Bind a reactive value with <code>v-model</code> to track which panel is open. The <code>items</code> prop accepts an array of objects; use <code>label-key</code> and <code>value-key</code> to specify which fields to read from.`,
      preview: basic,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to change the visual style. Available variants: <code>outlined</code> (default), <code>soft</code>, <code>underline</code>, and <code>plain</code>.`,
      preview: variants,
    },
    {
      title: 'Disabled',
      description: `Set <code>disabled</code> to disable the entire accordion. Use the <code>item-disabled</code> prop with a function to disable individual items.`,
      preview: disabled,
    },
    {
      title: 'Indicator slot',
      description: `Use the <code>indicator</code> slot to replace the default chevron icon. The slot receives the <code>expanded</code> state to toggle between icons.`,
      preview: indicator,
    },
    {
      title: 'Programmatic toggle',
      description: `The accordion exposes a <code>toggle</code> method via template ref. Call it to programmatically expand or collapse a specific item.`,
      preview: toggle,
    },
    {
      title: 'Custom slots & multiple',
      description: `Use the scoped <code>default</code> slot to replace the built-in trigger, and the <code>content</code> slot to replace the panel body. Set <code>multiple</code> to allow several sections open at the same time.`,
      preview: custom,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
