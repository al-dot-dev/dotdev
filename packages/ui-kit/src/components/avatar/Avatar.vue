<script lang="ts" setup>
import type { UIAvatarEmits, UIAvatarProps, UIAvatarSlots } from './avatar.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { computed } from 'vue'
import { Icon } from '../icon'
import { avatarStyle } from '@dotdev/theme'

defineEmits<UIAvatarEmits>()
defineSlots<UIAvatarSlots>()
const props = withDefaults(defineProps<UIAvatarProps>(), {
  ui: 'avatar',
  border: false,
  square: false,
  color: 'neutral',
  variant: 'soft',
})

const { ui, bem } = useUiKit('avatar', props, avatarStyle)
const rootClass = computed(() => {
  const { border, color, square, variant } = ui
  return bem([color, variant], { border, square })
})
</script>

<template>
  <div :class="rootClass" v-bind="el">
    <img v-if="src" :alt="alt" :class="bem('image')" :src="src" />
    <span v-else-if="label" :class="bem('label')">{{ label }}</span>
    <Icon v-else-if="icon" :class="bem('icon')" :name="icon" />
    <slot />
  </div>
</template>
