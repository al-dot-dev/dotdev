<script lang="ts" setup>
import type { UILayoutHeaderEmits, UILayoutHeaderProps, UILayoutHeaderSlots } from './layout.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { useLayoutScope } from './useLayoutScope.ts'

defineEmits<UILayoutHeaderEmits>()
defineSlots<UILayoutHeaderSlots>()
const props = withDefaults(defineProps<UILayoutHeaderProps>(), {
  ui: 'layout-header',
})

const { bem } = useUiKit('layout-header', props)

useLayoutScope()?.registerHeader()
</script>

<template>
  <header :class="bem()" v-bind="el">
    <div :class="bem('group')">
      <slot name="left" />
    </div>
    <slot />
    <div :class="bem('group')">
      <slot name="right" />
    </div>
  </header>
</template>
