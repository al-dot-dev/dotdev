<script lang="ts" setup>
import type { UIFlexEmits, UIFlexProps, UIFlexSlots } from './flex.types.ts'
import { useUiKit } from '@dotdev/ui-kit'

defineOptions({ inheritAttrs: false })

defineEmits<UIFlexEmits>()
defineSlots<UIFlexSlots>()
const props = withDefaults(defineProps<UIFlexProps>(), {
  ui: 'flex',
})

useUiKit('flex', props)
</script>

<template>
  <div :class="$attrs.class" v-bind="el">
    <slot />
  </div>
</template>
