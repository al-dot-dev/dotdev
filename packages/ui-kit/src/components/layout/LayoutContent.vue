<script lang="ts" setup>
import type { UILayoutContentEmits, UILayoutContentProps, UILayoutContentSlots } from './layout.types.ts'
import { useUiKit } from '@dotdev/ui-kit'

defineEmits<UILayoutContentEmits>()
defineSlots<UILayoutContentSlots>()
const props = withDefaults(defineProps<UILayoutContentProps>(), {
  ui: 'layout-content',
})

const { bem } = useUiKit('layout-content', props)
</script>

<template>
  <main :class="bem()" v-bind="el">
    <slot />
  </main>
</template>
