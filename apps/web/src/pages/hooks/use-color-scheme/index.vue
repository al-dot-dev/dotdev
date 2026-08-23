<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import demo from './examples/demo.vue'

defineDocPage({
  title: 'useColorScheme',
  icon: 'code',
  description: `A composable that manages a <code>light</code> / <code>dark</code> / <code>auto</code> color scheme and toggles the <code>dark</code> class on <code>&lt;html&gt;</code> or a custom target element. The scheme ref is shared across every call, persisted to <code>localStorage</code> and follows the system preference while in <code>auto</code> mode.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Targeted theming',
      description: `Use the <code>target</code> option to apply the class to a scoped element instead of the document root. Because the scheme state is global, switching it here also re-themes the whole app — the same instance powers this documentation shell.`,
      preview: demo,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
