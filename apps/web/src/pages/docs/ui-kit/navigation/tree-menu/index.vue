<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'

defineDocPage({
  title: 'TreeMenu',
  icon: 'component-1',
  styleScope: 'tree-menu',
  description: `A hierarchical navigation menu that renders nested items as a collapsible tree. Branches with children expand and collapse via an indicator, and each node supports selection, icons, and per-node disabled state. Keyboard navigation uses a roving <code>tabindex</code> with arrow keys to move between nodes.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Pass nested <code>items</code> and optionally bind <code>selected</code> / <code>expanded</code>. Each object may have a <code>label</code>, <code>value</code>, <code>icon</code>, <code>disabled</code> and <code>children</code>.`,
      preview: basic,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
