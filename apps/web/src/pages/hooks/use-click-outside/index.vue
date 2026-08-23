<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import multiple from './examples/multiple.vue'
import popup from './examples/popup.vue'

defineDocPage({
  title: 'useClickOutside',
  icon: 'code',
  description: `A composable that invokes a callback on every <code>pointerdown</code> outside the given element or elements. Accepts plain elements, refs or arrays of refs, is registered in the capture phase so it fires before inner handlers stop propagation, and cleans itself up on unmount.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Dismissing a popover',
      description: `Pass a single ref to guard one element. Any pointer press outside of it triggers the callback — here the popover closes while clicks inside keep it open.`,
      preview: popup,
    },
    {
      title: 'Multiple targets',
      description: `Pass an array to exclude several elements at once. The input and its suggestion list are both guarded, so switching focus between them does not dismiss the dropdown.`,
      preview: multiple,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
