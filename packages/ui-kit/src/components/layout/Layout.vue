<script lang="ts" setup>
import { computed } from 'vue'
import type { UILayoutEmits, UILayoutProps, UILayoutSlots } from './layout.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { layoutStyle } from '@dotdev/theme'

defineEmits<UILayoutEmits>()
defineSlots<UILayoutSlots>()
const props = withDefaults(defineProps<UILayoutProps>(), {
  ui: 'layout',
})

const ui = useUiKitProps('layout', props)

const bem = useUiKitBem(ui)
useUiKitTheme(ui, layoutStyle)

const rootClass = computed(() => bem())
</script>

<template>
  <div :class="rootClass">
    <slot />

    <div v-if="$slots.body" :class="bem('body')">
      <slot name="body" />
    </div>
  </div>
</template>
