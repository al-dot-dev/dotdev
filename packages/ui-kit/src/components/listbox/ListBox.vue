<script generic="T, L extends keyof T, V extends keyof T, M extends boolean" lang="ts" setup>
import type { UIListBoxEmits, UIListBoxExpose, UIListBoxProps, UIListBoxSlots } from './listbox.types.ts'
import {
  asTemplateRef,
  Icon,
  normalizeBooleanProp,
  Scope,
  useArrayModel,
  useGlobalEvent,
  useKeyboardNavigation,
  useTypeahead,
  useUiKit,
} from '@dotdev/ui-kit'
import { computed, ref, useId, useTemplateRef } from 'vue'
import { listboxStyle } from '@dotdev/theme'

type FocusDirection = 1 | -1 | 0

defineEmits<UIListBoxEmits>()
defineSlots<UIListBoxSlots<T>>()
const props = withDefaults(defineProps<UIListBoxProps<T, L, V, M>>(), {
  ui: 'listbox',
  items: () => [],
  disabled: false,
  deselectable: false,
  typeahead: true,
  square: false,
  checkmark: 'right',
  checkmarkIcon: 'check',
  columns: 1,
  size: 'md',
  variant: 'outlined',
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const id = useId()
const { ui, bem } = useUiKit('listbox', props, listboxStyle)
const { toggle, isSelected, findSelectedIndex, getItemLabel, isItemDisabled } = useArrayModel<T>(model, {
  multiple: () => normalizeBooleanProp(ui.multiple),
  deselectable: () => ui.deselectable,
  valueKey: () => props.valueKey,
  labelKey: ui.labelKey,
  itemDisabled: () => ui.itemDisabled,
})

function getListboxId() {
  return `${id}-listbox`
}

function getOptionId(index: number) {
  return `${id}-listbox-option-${index}`
}

const listboxRef = useTemplateRef('listbox')

const isFocused = ref(false)
const hasNativeFocus = ref(false)
const isMouseNavigation = ref(false)
const isGrid = computed(() => typeof ui.columns === 'number' && ui.columns > 0)

const nav = useKeyboardNavigation<T>(() => ui.items, {
  columns: () => ui.columns,
  isEnabled: () => isFocused.value,
  isSkipped: isItemDisabled,
})

const { search } = useTypeahead({
  options: () => ui.items,
  getLabel: getItemLabel,
  isDisabled: isItemDisabled,
  getCurrentIndex: () => nav.currentIndex.value,
  onMatch: (index) => {
    nav.setCurrentIndex(index)
    scrollIntoView()
  },
})

function onFocusIn(direction: FocusDirection = 1) {
  isFocused.value = true

  if (direction === 0) return

  if (!nav.hasCurrentItem.value) {
    const selectedIndex = findSelectedIndex(ui.items, direction === 1 ? 'first' : 'last')

    if (selectedIndex !== -1) {
      nav.setCurrentIndex(selectedIndex)
    } else {
      direction === 1 ? nav.next() : nav.previous()
    }
  }

  scrollIntoView()
  // TODO: emit
  // TODO: add mouse multiselection with shift
}

function onFocusOut() {
  isFocused.value = false
  nav.setCurrentIndex(-1)
  isMouseNavigation.value = false
}

function onNativeFocusIn() {
  onFocusIn()
  hasNativeFocus.value = true
}

function onNativeFocusOut() {
  onFocusOut()
  hasNativeFocus.value = false
}

function focus() {
  listboxRef.value?.focus()
}

function blur() {
  listboxRef.value?.blur()
}

function onMouseDown() {
  isMouseNavigation.value = true
}

function onKeyDown(event: KeyboardEvent) {
  if (!isFocused.value) return

  if (nav.onKeydown(event)) {
    isMouseNavigation.value = false
    scrollIntoView()
    return
  }

  switch (event.code) {
    case 'PageDown':
      scrollIntoView(ui.items.length - 1)
      break

    case 'PageUp':
      scrollIntoView(0)
      break

    case 'Enter':
    case 'NumpadEnter':
    case 'Space':
      onEnter()
      break

    default:
      const isPrintableKey = !event.metaKey && !event.ctrlKey && event.key.length === 1

      if (isPrintableKey && ui.typeahead) {
        search(event.key)
        event.preventDefault()
      }

      return
  }

  isMouseNavigation.value = false
  event.preventDefault()
}

useGlobalEvent('keydown', onKeyDown, { watch: isFocused })

/* Keyboard handlers */
function onEnter() {
  if (!nav.hasCurrentItem.value) return
  const index = nav.currentIndex.value
  toggleOptionSelect(ui.items[index], index)
}

function scrollIntoView(index = -1) {
  const id = getOptionId(index !== -1 ? index : nav.currentIndex.value)
  const element = document.getElementById(id)
  if (!element || !element.scrollIntoView) return
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
}

/* Option handler */
function isOptionFocused(index: number) {
  return nav.currentIndex.value === index
}

function toggleOptionSelect(option: T, index: number) {
  if (isItemDisabled(option)) return

  toggle(option)
  nav.setCurrentIndex(index)
}

function getOptionBindings(option: T, index: number) {
  const id = getOptionId(index)
  const label = getItemLabel(option)
  const disabled = isItemDisabled(option)
  const selected = isSelected(option)
  const focused = isOptionFocused(index)
  const size = ui.items.length
  const highlighted = !isMouseNavigation.value && focused
  const cls = bem('item', { selected, disabled, focused })
  const props = { index, focused, selected, disabled, label, size, highlighted }

  return {
    id,
    class: cls,
    ...props,
    onMousedown: () => {
      if (ui.disabled || disabled) return
      toggleOptionSelect(option, index)
    },
  }
}

const rootAttrs = computed(() => {
  const { size, variant, square, disabled, invalid } = ui
  return {
    id: getListboxId(),
    class: bem([size, variant], { square, disabled, invalid, grid: isGrid.value }),
    tabindex: ui.disabled ? -1 : 0,
    role: 'listbox',
    'aria-disabled': ui.disabled,
    'aria-orientation': 'vertical' as const,
    'aria-multiselectable': normalizeBooleanProp(ui.multiple),
    'aria-activedescendant': nav.hasCurrentItem.value ? getOptionId(nav.currentIndex.value) : undefined,
  }
})

defineExpose<UIListBoxExpose>({
  id: getListboxId(),
  hasNativeFocus,
  isFocused,
  focus,
  blur,
  focusIn: onFocusIn,
  focusOut: onFocusOut,
})

const tui = asTemplateRef(ui)
</script>

<template>
  <ul
    ref="listbox"
    :style="isGrid ? { '--ui-listbox-columns': tui.columns } : undefined"
    v-bind="{ ...rootAttrs, ...el }"
    @focusin="onNativeFocusIn"
    @focusout="onNativeFocusOut"
    @mousedown="onMouseDown"
  >
    <Scope v-for="(item, idx) in tui.items" :key="idx" #default="scope" :scope="getOptionBindings(item, idx)">
      <li
        :id="scope.id"
        :aria-disabled="disabled"
        :aria-label="scope.label"
        :aria-posinset="scope.index + 1"
        :aria-selected="scope.selected"
        :aria-setsize="scope.size"
        :class="scope.class"
        :data-highlighted="scope.highlighted ? '' : undefined"
        role="option"
        @mousedown="scope.onMousedown"
      >
        <Icon
          v-if="tui.checkmark === 'left'"
          :class="bem('checkmark', [tui.checkmark])"
          :name="checkmarkIcon ?? 'check'"
        />
        <slot name="default" v-bind="{ option: item, ...scope }">{{ scope.label }}</slot>
        <Icon v-if="tui.checkmark === 'right'" :class="bem('checkmark', [tui.checkmark])" :name="checkmarkIcon" />
      </li>
    </Scope>
  </ul>
</template>
