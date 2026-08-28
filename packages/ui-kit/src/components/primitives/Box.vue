<script lang="ts" setup>
import type { UIBoxEmits, UIBoxProps, UIBoxSlots } from './primitives.types.ts'

defineOptions({ inheritAttrs: false })

defineEmits<UIBoxEmits>()
defineSlots<UIBoxSlots>()
const props = withDefaults(defineProps<UIBoxProps>(), {})
</script>

<template>
  <div v-bind="{ ...$attrs, ...el }">
    <slot />
  </div>
</template>
