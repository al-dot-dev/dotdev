<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'

defineDocPage({
  title: 'Box',
  icon: 'component-1',
  description: `A layout primitive for building flexbox containers. Use the <code>direction</code>, <code>align</code>, <code>justify</code>, <code>wrap</code> and <code>gap</code> props to control the flexible box layout of its children.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Box covering the basics',
      description: `A single <code>Box</code> drives flex layout, grid, item control, spacing, sizing, shapes, state variants and positioning — every prop maps straight to a Tailwind utility, using only the default palette.`,
      preview: base,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
