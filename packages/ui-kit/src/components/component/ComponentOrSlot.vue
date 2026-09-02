<script lang="ts" setup>
import type { Component } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  is?: string | Component
}

defineProps<Props>()
</script>

<template>
  <component :is="is" v-if="is" v-bind="$attrs">
    <slot />
  </component>

  <slot v-else />
</template>
