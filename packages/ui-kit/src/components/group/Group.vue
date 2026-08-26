<script lang="ts" setup>
import type { UIGroupEmits, UIGroupProps, UIGroupSlots } from './group.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { computed } from 'vue'
import { groupStyle } from '@dotdev/theme'

defineEmits<UIGroupEmits>()
defineSlots<UIGroupSlots>()
const props = withDefaults(defineProps<UIGroupProps>(), {
  ui: 'group',
  axis: 'x',
})

const { ui, bem } = useUiKit('group', props, groupStyle)

const rootClass = computed(() => bem([ui.axis]))
</script>

<template>
  <div :class="rootClass" v-bind="el">
    <slot />
  </div>
</template>
