<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import base from './examples/base.vue'

defineDocPage({
  title: 'Flex',
  icon: 'component-1',
  styleScope: 'flex',
  description: `A layout primitive for building flexbox containers. Use the <code>direction</code>, <code>align</code>, <code>justify</code>, <code>wrap</code> and <code>gap</code> props to control the flexible box layout of its children.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>Flex</code> as a drop-in flex container. The example below centers three items horizontally with a medium gap.`,
      preview: base,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
