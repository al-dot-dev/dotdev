<script lang="ts" setup>
import { computed } from 'vue'
import type { UIDividerEmits, UIDividerProps, UIDividerSlots } from './divider.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { dividerStyle } from '@dotdev/theme'

defineEmits<UIDividerEmits>()
defineSlots<UIDividerSlots>()
const props = withDefaults(defineProps<UIDividerProps>(), {
  ui: 'divider',
  is: 'div',
  orientation: 'horizontal',
  variant: 'solid',
  color: 'neutral',
})

const { ui, bem } = useUiKit('divider', props, dividerStyle)
const rootClass = computed(() => {
  const { color, orientation, variant } = ui
  return bem([orientation, variant, color])
})
</script>

<template>
  <component :is="ui.is" :aria-orientation="ui.orientation" :class="rootClass" role="separator" v-bind="el">
    <span aria-hidden="true" :class="bem('line')" />
    <span v-if="label || $slots.default" :class="bem('label')">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="label || $slots.default" aria-hidden="true" :class="bem('line')" />
  </component>
</template>
