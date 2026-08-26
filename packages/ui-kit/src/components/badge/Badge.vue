<script lang="ts" setup>
import { computed } from 'vue'
import type { UIBadgeEmits, UIBadgeProps, UIBadgeSlots } from './badge.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { badgeStyle } from '@dotdev/theme'

defineEmits<UIBadgeEmits>()
const slot = defineSlots<UIBadgeSlots>()
const props = withDefaults(defineProps<UIBadgeProps>(), {
  ui: 'badge',
  color: 'primary',
  variant: 'soft',
})

const { ui, bem } = useUiKit('badge', props, badgeStyle)
const rootClass = computed(() => {
  const { variant, color, ring, label } = ui
  return bem([variant, color], { label: !!label || !!slot.default, ring })
})
</script>

<template>
  <span :class="rootClass" v-bind="el">
    <span v-if="dot" :class="bem('dot')" />
    <slot /> {{ label }}
  </span>
</template>
