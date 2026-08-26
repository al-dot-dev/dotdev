<script generic="T, L extends keyof T, V extends keyof T, M extends boolean" lang="ts" setup>
import { normalizeBooleanProp, useArrayModel, useUiKit } from '@dotdev/ui-kit'
import { computed } from 'vue'
import type { UISelectButtonEmits, UISelectButtonProps, UISelectButtonSlots } from './select-button.types.ts'
import { selectButtonStyle } from '@dotdev/theme'

defineEmits<UISelectButtonEmits>()
defineSlots<UISelectButtonSlots<T>>()
const props = withDefaults(defineProps<UISelectButtonProps<T, L, V, M>>(), {
  ui: 'select-button',
  items: () => [],
  square: false,
  disabled: false,
  deselectable: false,
  variant: 'soft',
  size: 'md',
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const { ui, bem } = useUiKit('select-button', props, selectButtonStyle)

const { toggle, isSelected, getItemLabel, isItemDisabled } = useArrayModel<T>(model, {
  multiple: () => normalizeBooleanProp(ui.multiple),
  deselectable: () => ui.deselectable,
  valueKey: ui.valueKey,
  labelKey: ui.labelKey,
  itemDisabled: () => ui.itemDisabled,
})

const rootClass = computed(() => {
  const { size, disabled, square, variant } = ui
  return bem([size, variant], { disabled, square })
})

function optionBindings(option: T) {
  const selected = isSelected(option)

  return {
    class: bem('item', { selected }),
    ariaPressed: selected,
    disabled: ui.disabled || isItemDisabled(option),
  }
}

function getOptionKey(option: T, index: number) {
  if (props.valueKey && typeof option === 'object' && option !== null) {
    return String(option[props.valueKey])
  }
  return typeof option === 'object' ? index : String(option)
}
</script>

<template>
  <div :class="rootClass" role="group">
    <button
      v-for="(option, idx) in items"
      :key="getOptionKey(option, idx)"
      type="button"
      v-bind="optionBindings(option)"
      @click="toggle(option)"
    >
      <slot :index="idx" :label="getItemLabel(option)" :option="option" :selected="isSelected(option)">
        {{ getItemLabel(option) }}
      </slot>
    </button>
  </div>
</template>
