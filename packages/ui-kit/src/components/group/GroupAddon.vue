<script lang="ts" setup>
import type { UIGroupAddonEmits, UIGroupAddonProps, UIGroupAddonSlots } from './group.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { computed } from 'vue'

defineEmits<UIGroupAddonEmits>()
defineSlots<UIGroupAddonSlots>()
const props = withDefaults(defineProps<UIGroupAddonProps>(), {
  ui: 'group-addon',
  size: 'md',
  variant: 'outlined',
})

const { ui, bem } = useUiKit('group-addon', props)

const rootClass = computed(() => bem([ui.size, ui.variant], { attach: ui.attach }))
</script>

<template>
  <div :class="rootClass">
    {{ label }}
    <slot />
  </div>
</template>
