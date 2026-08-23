<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import sizes from './examples/sizes.vue'
import shapes from './examples/shapes.vue'
import variants from './examples/variants.vue'
import card from './examples/card.vue'

defineDocPage({
  title: 'Skeleton',
  icon: 'component-1',
  styleScope: 'skeleton',
  description: `A placeholder preview of content before it loads. Renders neutral bars, typographic text lines that adopt the surrounding line-height, or square shapes like avatars — then swaps back to the real content once loading completes.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `The <code>text</code> prop turns the skeleton into a typographic placeholder: each line is <code>1em</code> tall and spaced by the surrounding line-height (<code>lh</code>), so it sits flush with real text at any font size. Pass <code>:lines</code> to render several rows; the trailing line shortens to <code>80%</code> like an unfinished paragraph unless an explicit width is set.`,
      preview: basic,
    },
    {
      title: 'Sizes',
      description: `Without <code>text</code>, the skeleton is a full-width <code>h-4</code> bar. Adjust dimensions with utility classes — <code>h-3</code>, <code>h-6</code>, or whatever the layout calls for.`,
      preview: sizes,
    },
    {
      title: 'Shapes',
      description: `Add <code>square</code> to drop the fixed height and follow the element's width (<code>aspect-square</code>). Paired with <code>rounded</code> it becomes a circle — ideal for avatar placeholders next to text lines.`,
      preview: shapes,
    },
    {
      title: 'Variants',
      description: `The default <code>pulse</code> variant breathes to indicate activity; use <code>static</code> when the skeleton sits inside an already animated container or should stay still.`,
      preview: variants,
    },
    {
      title: 'Card composition',
      description: `Skeletons accept real content in the default slot and swap it in when <code>loading</code> turns off — text becomes typographic lines, an avatar a circle, a button a sized bar. Wrap a region in <code>SkeletonProvider</code> to drive every nested skeleton from one state, and use <code>skeleton-class</code> to style the placeholder without touching the layout element.`,
      preview: card,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
