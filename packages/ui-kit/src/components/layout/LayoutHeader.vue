<script lang="ts" setup>
import type { UILayoutHeaderEmits, UILayoutHeaderProps, UILayoutHeaderSlots } from './layout.types.ts'
import { useUiKitBem, useUiKitProps } from '@dotdev/ui-kit'
import { useLayoutScope } from './useLayoutScope.ts'

defineEmits<UILayoutHeaderEmits>()
defineSlots<UILayoutHeaderSlots>()
const props = withDefaults(defineProps<UILayoutHeaderProps>(), {
  ui: 'layout-header',
})

const ui = useUiKitProps('layout-header', props)
const bem = useUiKitBem(ui)

useLayoutScope()?.registerHeader()
</script>

<template>
  <header :class="bem()">
    <div :class="bem('group')">
      <slot name="left" />
    </div>
    <slot />
    <div :class="bem('group')">
      <slot name="right" />
    </div>
  </header>
</template>
