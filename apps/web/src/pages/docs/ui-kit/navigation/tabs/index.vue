<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import disabled from './examples/disabled.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Tabs',
  icon: 'component-1',
  styleScope: 'tabs',
  description: `A tabbed interface for switching between related panels. Tabs follow the WAI-ARIA pattern: the list is focusable, arrow keys move a roving cursor between tabs, <code>Home</code> / <code>End</code> jump to the edges, and selection syncs through <code>v-model</code>. Set <code>activateOnFocus</code> to <code>false</code> to require an explicit confirmation with <code>Enter</code> or a click.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass <code>options</code> and bind <code>v-model</code>. The <code>#panel</code> slot renders content for the selected tab and exposes its <code>label</code>, <code>value</code>, <code>option</code> and <code>index</code>.`,
      preview: basic,
    },
    {
      title: 'Variants',
      description: `Use <code>variant</code> to change the look: <code>underlined</code> keeps tabs on a shared border, while <code>soft</code> and <code>outlined</code> render a segmented control with a filled active item.`,
      preview: variants,
    },
    {
      title: 'Sizes',
      description: `The <code>size</code> prop controls text scale, height and spacing of the tabs. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Objects and disabled options',
      description: `Options can be objects resolved through <code>labelKey</code> / <code>valueKey</code>. Use <code>optionDisabled</code> to make individual tabs unselectable — they are skipped by keyboard navigation as well.`,
      preview: disabled,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
