<script lang="ts" setup>
import { computed } from 'vue'
import type { UITagEmits, UITagProps, UITagSlots } from './tag.types.ts'
import { Icon, useUiKit } from '@dotdev/ui-kit'
import { tagStyle } from '@dotdev/theme'

defineEmits<UITagEmits>()
defineSlots<UITagSlots>()
const props = withDefaults(defineProps<UITagProps>(), {
  ui: 'tag',
  is: 'div',
  border: false,
  color: 'neutral',
  variant: 'soft',
})

const { ui, bem } = useUiKit('tag', props, tagStyle)
const rootClass = computed(() => {
  const { border, rounded, color, variant } = ui
  return bem([color, variant], { border, rounded })
})
</script>

<template>
  <component :is="ui.is" :class="rootClass">
    <slot name="prefix" />
    <Icon v-if="prefixIcon" :class="bem('icon')" :name="prefixIcon" />
    <slot />
    <span v-if="label" :class="bem('label')">
      <slot name="label">{{ label }}</slot>
    </span>
    <Icon v-if="suffixIcon" :class="bem('icon')" :name="suffixIcon" />
    <slot name="suffix" />
  </component>
</template>
