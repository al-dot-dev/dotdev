<script generic="T, L extends keyof T, V extends keyof T" lang="ts" setup>
import type { UITabsEmits, UITabsProps, UITabsSlots, UITabsSlotScope } from './tabs.types.ts'
import { computed, ref, useId, watch } from 'vue'
import { useArrayModel, useKeyboardNavigation, useUiKit } from '@dotdev/ui-kit'
import { tabsStyle } from '@dotdev/theme'

defineEmits<UITabsEmits>()
defineSlots<UITabsSlots<T>>()
const props = withDefaults(defineProps<UITabsProps<T, L, V>>(), {
  ui: 'tabs',
  options: () => [],
  size: 'md',
  variant: 'underlined',
  disabled: false,
  activateOnFocus: true,
})

const model = defineModel<T | undefined>()

const { ui, bem } = useUiKit('tabs', props, tabsStyle)
const id = useId()

const listRef = ref<HTMLElement | null>(null)

const { isSelected, select, findSelectedIndex, getItemLabel, getItemValue, isItemDisabled } = useArrayModel<T>(model, {
  valueKey: ui.valueKey,
  labelKey: ui.labelKey,
  itemDisabled: () => ui.itemDisabled,
})

const nav = useKeyboardNavigation(() => props.options, {
  isSkipped: isItemDisabled,
})

const selectedOption = computed(() => model.value)

const renderedIndex = computed(() => {
  const index = findSelectedIndex(props.options)
  return index === -1 ? 0 : index
})

function tabindexFor(index: number) {
  return index === (nav.currentIndex.value === -1 ? renderedIndex.value : nav.currentIndex.value) ? 0 : -1
}

watch(
  () => model.value,
  () => {
    nav.setCurrentIndex(renderedIndex.value)
  },
)

function scope(option: T, index: number): UITabsSlotScope<T> {
  return {
    option,
    index,
    selected: isSelected(option),
    label: getItemLabel(option),
    value: getItemValue(option),
  }
}

function focusTab(index: number) {
  listRef.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus()
}

function onSelect(option: T, index: number) {
  nav.setCurrentIndex(index)
  select(option)
}

function onKeydown(event: KeyboardEvent) {
  if (!nav.onKeydown(event)) return

  const index = nav.currentIndex.value
  const option = props.options[index]

  if (option === undefined) return

  focusTab(index)

  if (ui.activateOnFocus) select(option)
}

const rootClass = computed(() => bem([ui.size, ui.variant]))
</script>

<template>
  <div :class="rootClass">
    <div ref="listRef" :class="bem('list')" role="tablist">
      <button
        v-for="(option, idx) in options"
        :id="`${id}-tab-${idx}`"
        :key="idx"
        :aria-controls="`${id}-panel`"
        :aria-selected="isSelected(option)"
        :class="bem('item', { selected: isSelected(option), disabled: isItemDisabled(option) })"
        :disabled="isItemDisabled(option)"
        :tabindex="tabindexFor(idx)"
        role="tab"
        type="button"
        @click="onSelect(option, idx)"
        @keydown="onKeydown"
      >
        <slot name="item" v-bind="scope(option, idx)">{{ getItemLabel(option) }}</slot>
      </button>
    </div>

    <div
      v-if="selectedOption !== undefined && $slots.panel"
      :id="`${id}-panel`"
      :aria-labelledby="`${id}-tab-${renderedIndex}`"
      :class="bem('panel')"
      role="tabpanel"
      tabindex="0"
    >
      <slot name="panel" v-bind="scope(selectedOption, renderedIndex)" />
    </div>
  </div>
</template>
