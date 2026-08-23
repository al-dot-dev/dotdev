<script lang="ts" setup>
import type { UILayoutHeaderEmits, UILayoutHeaderProps, UILayoutHeaderSlots } from './layout.types.ts'
import { useUiKitBem, useUiKitProps } from '@dotdev/ui-kit'

defineEmits<UILayoutHeaderEmits>()
defineSlots<UILayoutHeaderSlots>()
const props = withDefaults(defineProps<UILayoutHeaderProps>(), {
  ui: 'layout-header',
})

const ui = useUiKitProps('layout-header', props)
const bem = useUiKitBem(ui)
</script>

<template>
  <header :class="bem()">
    <slot />
  </header>
</template>
