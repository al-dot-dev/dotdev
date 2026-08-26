<script lang="ts" setup>
import type { UIIconButtonProps } from './icon-button.types.ts'
import { Button, useUiKit } from '@dotdev/ui-kit'
import { computed } from 'vue'
import { iconButtonStyle } from '@dotdev/theme'

const props = withDefaults(defineProps<UIIconButtonProps>(), {
  ui: 'icon-button',
  size: 'md',
  color: 'neutral',
  variant: 'ghost',
  type: 'button',
})

const { ui, bem } = useUiKit('icon-button', props, iconButtonStyle)

const bind = computed(() => {
  const { ui: _, ...props } = ui
  return props
})
</script>

<template>
  <Button :class="bem()" v-bind="bind" />
</template>
