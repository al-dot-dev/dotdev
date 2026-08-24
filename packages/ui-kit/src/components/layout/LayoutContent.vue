<script lang="ts" setup>
import type { UILayoutContentEmits, UILayoutContentProps, UILayoutContentSlots } from './layout.types.ts'
import { useUiKitBem, useUiKitProps } from '@dotdev/ui-kit'

defineEmits<UILayoutContentEmits>()
defineSlots<UILayoutContentSlots>()
const props = withDefaults(defineProps<UILayoutContentProps>(), {
  ui: 'layout-content',
})

const ui = useUiKitProps('layout-content', props)
const bem = useUiKitBem(ui)
</script>

<template>
  <main :class="bem()">
    <slot />
  </main>
</template>
