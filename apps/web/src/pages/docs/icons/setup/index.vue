<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'

defineDocPage({
  title: 'Setup',
  icon: 'gear',
  description: `Icons are generated at build time by the <code>@dotdev/icons</code> Vite plugin, which scans a folder of SVGs and emits a fully typed registry. Wire the plugin into your <code>vite.config.ts</code>, pass the registry to <code>createUiKit()</code>, and every icon becomes a first-class, type-checked <code>&lt;Icon name="..." /&gt;</code>.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Install the plugin',
      description: `Add <code>uiKitIcons()</code> to your Vite plugins alongside <code>svgLoader</code>. Keep <code>removeViewBox: false</code> so icons keep their viewBox and scale with <code>font-size</code>. The plugin scans <code>pack/</code> (337 icons by default) and emits four files into <code>outDir</code>; in dev it watches for SVG add/remove and reloads.`,
      includes: ['vite.config'],
    },
    {
      title: 'Register the registry',
      description: `Pass the generated <code>icons</code> map to <code>createUiKit()</code> once at the app root. Names are inferred as a union type (<code>UiKitIcon</code>), so a mistyped <code>name</code> fails at compile time and autocompletes in the editor.`,
      includes: ['app-setup'],
    },
    {
      title: 'Bring your own icons',
      description: `Point the plugin at your own SVG folder with <code>dir</code>. Any <code>.svg</code> file is picked up on the next build or dev reload, its filename becoming the registry key (kebab-case).`,
      includes: ['custom-dir'],
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
