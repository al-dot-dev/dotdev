<script lang="ts" setup>
import type { UICollapseEmits, UICollapseProps, UICollapseSlots } from './collapse.types'
import TransitionCollapse from '../accordion/TransitionCollapse.vue'

defineSlots<UICollapseSlots>()
const emits = defineEmits<UICollapseEmits>()
const props = withDefaults(defineProps<UICollapseProps>(), {})
const model = defineModel<boolean>({ default: true })
</script>

<template>
  <TransitionCollapse>
    <slot v-if="model" />
  </TransitionCollapse>
</template>
