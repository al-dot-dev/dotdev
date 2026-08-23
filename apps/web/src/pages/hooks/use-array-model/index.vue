<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import multiple from './examples/multiple.vue'
import single from './examples/single.vue'

defineDocPage({
  title: 'useArrayModel',
  icon: 'code',
  description: `A composable that normalizes selection state over a model ref holding either a single value or an array. Exposes <code>isSelected</code>, <code>select</code>, <code>unselect</code>, <code>toggle</code> and <code>findSelectedIndex</code>, compares entries by a <code>valueKey</code> or by identity, and reacts to runtime changes of <code>multiple</code> and <code>deselectable</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Single selection',
      description: `Pass a model ref and a <code>valueKey</code> to compare objects by identity field instead of reference. <code>select</code> replaces the current value; enable <code>deselectable</code> to allow clearing it via <code>unselect</code> / <code>toggle</code>.`,
      preview: single,
    },
    {
      title: 'Multiple selection',
      description: `Set <code>multiple</code> to store selected entries as an array. <code>toggle</code> adds and removes entries, keeping the original references so consumers can hold onto their objects.`,
      preview: multiple,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
