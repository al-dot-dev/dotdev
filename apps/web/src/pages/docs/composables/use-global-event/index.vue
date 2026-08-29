<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import watch from './examples/watch.vue'
import window from './examples/window.vue'

defineDocPage({
  title: 'useGlobalEvent',
  icon: 'code',
  description: `A typed composable for subscribing to <code>window</code> and <code>document</code> events. Listeners attach on mount and detach on unmount by default; pass a <code>watch</code> ref to toggle a listener reactively instead. Handler payloads are typed through <code>WindowEventMap</code> / <code>DocumentEventMap</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Window events',
      description: `Set <code>target: "window"</code> to listen on the global scope. The handler receives the fully typed event object, e.g. <code>MouseEvent</code> for <code>mousemove</code>.`,
      preview: window,
    },
    {
      title: 'Reactive listeners',
      description: `Pass <code>watch</code> to bind and unbind the listener as the ref changes — with <code>immediate: true</code> it attaches right away during setup rather than waiting for mount.`,
      preview: watch,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
