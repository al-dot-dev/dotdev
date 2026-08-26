<script generic="T, L extends keyof T, V extends keyof T, M extends boolean | undefined" lang="ts" setup>
import {
  asTemplateRef,
  Floating,
  Icon,
  ListBox,
  normalizeBooleanProp,
  useUiKit,
} from '@dotdev/ui-kit'
import type { UISelectEmits, UISelectProps, UISelectSlots } from './select.types.ts'
import { computed, nextTick, ref, useId, useTemplateRef } from 'vue'
import { selectStyle } from '@dotdev/theme'

const UI_NAME = 'select'

defineEmits<UISelectEmits>()
defineSlots<UISelectSlots>()
const props = withDefaults(defineProps<UISelectProps<T, L, V, M>>(), {
  ui: UI_NAME,
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const { ui, bem } = useUiKit(UI_NAME, props, selectStyle)

const floatingRef = useTemplateRef('floating')
const comboboxRef = useTemplateRef('combobox')
const listboxRef = useTemplateRef('listbox')

const listboxId = `${useId()}-listbox`
const isFocused = ref(false)
const isOpen = computed(() => !!floatingRef.value?.isOpen)
const multiple = computed(() => normalizeBooleanProp(ui.multiple))

const rootClass = computed(() => {
  const { size, disabled, invalid, variant } = ui
  return bem([size, variant], { disabled, invalid, focused: isFocused.value || isOpen.value })
})

const isPlaceholder = computed(() => {
  const value = model.value
  if (Array.isArray(value)) return value.length === 0
  return value === null || value === undefined || value === ''
})

function getOptionLabel(option: T) {
  return String(ui.labelKey ? option[ui.labelKey] : option)
}

const displayLabel = computed(() => {
  if (isPlaceholder.value) return ''
  const value = model.value

  if (Array.isArray(value)) {
    return value.map(getOptionLabel).join(', ')
  }

  return getOptionLabel(value as T)
})

const comboboxAttrs = computed(() => ({
  class: bem('label', { placeholder: isPlaceholder.value }),
  tabindex: ui.disabled ? -1 : 0,
  disabled: ui.disabled,
  role: 'combobox',
  'aria-controls': listboxId,
  'aria-expanded': isOpen.value,
  'aria-haspopup': 'listbox' as const,
  'aria-label': ui.placeholder,
}))

function restoreFocus() {
  comboboxRef.value?.focus()
}

function toggleDropdown(event: Event) {
  if (ui.disabled) return
  floatingRef.value?.toggle(event)
  comboboxRef.value?.focus()
}

function closeDropdown() {
  if (multiple.value) return
  floatingRef.value?.close()
}

function closeAndBlur() {
  floatingRef.value?.close()
  isFocused.value = false
}

function onKeyDown(event: KeyboardEvent) {
  if (ui.disabled) return
  if (event.key === 'Tab') closeAndBlur()

  if (event.key === 'Escape') {
    floatingRef.value?.close()
    return
  }

  if (listboxRef.value?.isFocused) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()

      toggleDropdown(event)

      if (!isPlaceholder.value) {
        nextTick(() => listboxRef.value?.focusIn())
        event.stopPropagation()
      }

      break

    case 'ArrowDown':
    case 'ArrowUp':
      event.preventDefault()

      if (!isOpen.value) {
        floatingRef.value?.open(event)
      }

      nextTick(() => {
        listboxRef.value?.focusIn(event.key === 'ArrowUp' ? -1 : 1)
        event.stopPropagation()
      })
      break
  }
}

const tui = asTemplateRef(ui)
</script>

<template>
  <Floating ref="floating" #default="{ ref, style, isOpen }" :offset="2" auto-update fit @click-outside="closeAndBlur">
    <div :class="rootClass" @click="toggleDropdown" @keydown="onKeyDown">
      <span ref="combobox" v-bind="comboboxAttrs" @focus="isFocused = true">
        {{ displayLabel || tui.placeholder }}
      </span>

      <div :class="bem('dropdown')" aria-hidden="true">
        <Icon name="chevron-down" />
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isOpen" :ref="ref" :class="bem('listbox-wrapper')" :style="style">
        <ListBox
          :id="listboxId"
          ref="listbox"
          v-model="model"
          #default="scope"
          :deselectable="tui.deselectable"
          :disabled="tui.disabled"
          :label-key="tui.labelKey"
          :multiple="multiple"
          :option-disabled="tui.optionDisabled"
          :items="tui.items"
          :placeholder="tui.placeholder"
          :size="tui.size"
          :value-key="tui.valueKey"
          tabindex="-1"
          @click="restoreFocus"
          @update:model-value="closeDropdown"
        >
          <slot v-bind="scope" />
        </ListBox>
      </div>
    </Teleport>
  </Floating>
</template>
