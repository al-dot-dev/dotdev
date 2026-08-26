<script lang="ts" setup>
import { computed } from 'vue'
import type { UIInputEmits, UIInputProps, UIInputSlots } from './input.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { inputStyle } from '@dotdev/theme'

defineSlots<UIInputSlots>()
defineEmits<UIInputEmits>()
const props = withDefaults(defineProps<UIInputProps>(), {
  ui: 'input',
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<string>({ default: '' })
const { ui, bem } = useUiKit('input', props, inputStyle)
const rootClass = computed(() => {
  const { disabled, invalid, size, variant } = ui
  return bem([size, variant], { disabled, invalid })
})
</script>

<template>
  <input v-model="model" :class="rootClass" :disabled="disabled" v-bind="el" />
</template>
