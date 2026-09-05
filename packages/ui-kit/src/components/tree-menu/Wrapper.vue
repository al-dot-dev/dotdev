<script generic="T" lang="ts" setup>
import { computed, useAttrs } from 'vue'
import Menu from './TreeMenu.vue'
import type { UITreeMenuEmits, UITreeMenuProps, UITreeMenuSlots } from './tree-menu.types.ts'
import { useKeyboardNavigation } from './useKeyboardMotion.ts'
import { useGlobalEvent } from '@dotdev/ui-kit'

const ITEM_EVENT_PREFIX = 'onItem:'

defineOptions({ inheritAttrs: false })
defineSlots<UITreeMenuSlots<T>>()
const emits = defineEmits<UITreeMenuEmits<T>>()
const props = defineProps<UITreeMenuProps<T>>()

const attrs = useAttrs()

const bindAttrs = computed(() => {
  const rootAttrs: Record<string, unknown> = {}
  const itemAttrs: Array<[string, Function]> = []

  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith(ITEM_EVENT_PREFIX)) {
      if (typeof value === 'function') {
        itemAttrs.push([key.replace(ITEM_EVENT_PREFIX, 'on'), value])
      }

      continue
    }

    rootAttrs[key] = value
  }

  function itemAttrsFn(item: T) {
    const result: Record<string, Function> = {}

    for (const [key, handler] of itemAttrs) {
      result[key] = (event: Event) => handler(item, event)
    }

    return { ...props.itemAttrs?.(item), ...result }
  }

  return { ...rootAttrs, itemAttrs: itemAttrsFn }
})

const { handleKeydown, activeItem } = useKeyboardNavigation({
  items: () => props.items ?? [],
  childrenKey: () => props.childrenKey,
  isDisabled: props.disabledItem,
  isExpanded: props.expandedItem,
  onExpand: (item) => emits('expand', item),
  onCollapse: (item) => emits('collapse', item),
})

useGlobalEvent('keydown', handleKeydown)
</script>

<template>
  <Menu v-bind="{ ...props, ...bindAttrs, focusedItem: activeItem }">
    <template #item="scope">
      <slot name="item" v-bind="scope" />
    </template>
    <template #label="scope">
      <slot name="label" v-bind="scope" />
    </template>
    <template #children="scope">
      <slot name="children" v-bind="scope" />
    </template>
  </Menu>
</template>
