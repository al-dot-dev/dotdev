<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import demo from './examples/demo.vue'

defineDocPage({
  title: 'useElementRef',
  icon: 'code',
  description: `A composable that returns a reactive reference to a rendered DOM element. Spread the result onto any element via <code>v-bind</code> (or pass it as a component's <code>el</code> prop) and read the underlying node from <code>.value</code>. The reference is cleared automatically when the element unmounts.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Raw element access',
      description: `Create a ref with <code>useElementRef</code>, bind it to a native element and inspect the real DOM node (here, its tag name).`,
      preview: demo,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
