<script lang="ts" setup>
import type { UILayoutSidebarEmits, UILayoutSidebarProps, UILayoutSidebarSlots } from './layout.types.ts'
import { useUiKitBem, useUiKitProps } from '@dotdev/ui-kit'

defineEmits<UILayoutSidebarEmits>()
defineSlots<UILayoutSidebarSlots>()
const props = withDefaults(defineProps<UILayoutSidebarProps>(), {
  ui: 'layout-sidebar',
})

const ui = useUiKitProps('layout-sidebar', props)
const bem = useUiKitBem(ui)
</script>

<template>
  <aside :class="bem()">
    <div v-if="$slots.header" :class="bem('header')">
      <slot name="header" />
    </div>

    <div :class="bem('body')">
      <slot />
    </div>

    <footer v-if="$slots.footer" :class="bem('footer')">
      <slot name="footer" />
    </footer>
  </aside>
</template>
