<script generic="T" lang="ts" setup>
import type { UITreeMenuEmits, UITreeMenuProps, UITreeMenuSlots, UITreeMenuSlotScope } from './tree-menu.types.ts'
import { computed, h, ref, useAttrs } from 'vue'
import { asTemplateRef, Scope, TreeMenu, useGlobalEvent, useUiKit } from '@dotdev/ui-kit'
import { treeMenuStyle } from '@dotdev/theme'
import { useKeyboardNavigation } from './useKeyboardMotion.ts'

const ITEM_EVENT_PREFIX = 'onItem:'

defineOptions({ inheritAttrs: false })

defineEmits<UITreeMenuEmits<T>>()
const slots = defineSlots<UITreeMenuSlots<T>>()
const props = withDefaults(defineProps<UITreeMenuProps<T>>(), {
  ui: 'tree-menu',
  size: 'md',
  items: () => [],
  root: true,
})

const attrs = useAttrs()

const { ui, bem } = useUiKit('tree-menu', props, treeMenuStyle)
const tui = asTemplateRef(ui)

const rootClass = computed(() => bem([ui.size]))

const separatedAttrs = computed(() => {
  const root: Record<string, unknown> = {}
  const item: Record<string, Function> = {}

  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith(ITEM_EVENT_PREFIX)) {
      if (typeof value === 'function') item[key] = value
      continue
    }

    root[key] = value
  }

  return { root, item }
})

function getChildren(item: T): T[] {
  if (!props.childrenKey) return []
  return (item[props.childrenKey] ?? []) as T[]
}

function getItemLabel(item: T): string {
  return String(props.labelKey ? item[props.labelKey] : item)
}

function getItemListeners(item: T) {
  const entries = Object.entries(separatedAttrs.value.item).map(([key, handler]) => {
    const event = key.slice(ITEM_EVENT_PREFIX.length)
    return [event, (e: Event) => handler(item, e)]
  })

  return Object.fromEntries(entries)
}

function renderNested(items: T[]) {
  return h(
    TreeMenu<T>,
    { ...props, items, ...separatedAttrs.value.item, root: false, focusedItem: focusedItem.value },
    slots,
  )
}

function buildScope(item: T): UITreeMenuSlotScope<T> {
  const items = getChildren(item)
  const bind = ref<HTMLElement | HTMLElement[]>()
  const anchor = computed(() => (Array.isArray(bind.value) ? bind.value[0] : bind.value))

  return {
    item,
    items,
    anchor,
    bind,
    label: getItemLabel(item),
    Children: items.length ? renderNested(items) : null,
  }
}

const focusedItem = computed(() => activeItem.value ?? attrs.focusedItem)

const { handleKeydown, activeItem } = useKeyboardNavigation({
  items: () => (attrs.focusedItem ? [] : props.items),
  childrenKey: () => props.childrenKey,
  isDisabled: props.disabledItem,
  isExpanded: props.expandedItem,
  onExpand: props.onExpand,
  onCollapse: props.onCollapse,
})

useGlobalEvent('keydown', handleKeydown, {
  immediate: true,
  watch: computed(() => props.root),
})
</script>

<template>
  <ul :class="rootClass" role="tree" v-bind="{ ...el, ...separatedAttrs.root }">
    <li v-for="(item, index) in tui.items" :key="index" role="treeitem">
      <Scope #default="scope" :scope="buildScope(item)">
        <button :ref="scope.bind" :class="bem('item', { focused: focusedItem === item })" v-on="getItemListeners(item)">
          <slot :item="scope.item" :label="scope.label" name="label">
            {{ scope.label }}
          </slot>
        </button>

        <slot v-if="scope.items.length" name="children" v-bind="scope">
          <!--          <component :is="renderNested(scope.items)" :scope="scope" />-->
          <!--          <TreeMenu v-bind="{ ...props, items: scope.items, ...separatedAttrs.item, root: false, focusedItem }" />-->
        </slot>
      </Scope>
    </li>
  </ul>
</template>
