<script generic="T" lang="ts" setup>
import type { UITreeMenuEmits, UITreeMenuProps, UITreeMenuSlots, UITreeMenuSlotScope } from './tree-menu.types.ts'
import { type ComponentPublicInstance, computed, h, ref } from 'vue'
import { asTemplateRef, Scope, useUiKit } from '@dotdev/ui-kit'
import TreeMenu from './TreeMenu.vue'

import { treeMenuStyle } from '@dotdev/theme'

defineEmits<UITreeMenuEmits<T>>()
const slots = defineSlots<UITreeMenuSlots<T>>()
const props = withDefaults(defineProps<UITreeMenuProps<T>>(), {
  ui: 'tree-menu',
  size: 'md',
  items: () => [],
})

const { ui, bem } = useUiKit('tree-menu', props, treeMenuStyle)
const tui = asTemplateRef(ui)

const rootClass = computed(() => {
  const { size } = ui
  return bem([size])
})

function getChildren(item: T): T[] {
  if (!props.childrenKey) return []
  return (item[props.childrenKey] ?? []) as T[]
}

function getItemLabel(item: T): string {
  return String(props.labelKey ? item[props.labelKey] : item)
}

function renderNested(items: T[]) {
  return h(TreeMenu<T>, { ...props, items }, slots)
}

const elementRefs = ref(new Map<T, HTMLElement>())
function setElementRef(item: T, el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement) {
    elementRefs.value.set(item, el)
  } else {
    elementRefs.value.delete(item)
  }
}

function buildScope(item: T): UITreeMenuSlotScope<T> {
  const children = getChildren(item)
  const element = computed(() => elementRefs.value.get(item))

  return {
    item,
    children,
    element,
    ref: (el) => setElementRef(item, el),
    label: getItemLabel(item),
    NestedMenu: children.length ? renderNested(children) : null,
  }
}
</script>

<template>
  <ul :class="rootClass">
    <li v-for="(item, index) in tui.items" :key="index">
      <Scope #default="scope" :scope="buildScope(item)">
        <button
          :ref="scope.ref"
          :class="bem('item', { focused: tui.focusedItem === item })"
          v-bind="tui.itemAttrs?.(item)"
        >
          <slot name="label" v-bind="scope">
            {{ scope.label }}
          </slot>
        </button>

        <slot v-if="scope.children.length" name="children" v-bind="scope">
          <component :is="renderNested(scope.children)" />
        </slot>
      </Scope>
    </li>
  </ul>
</template>
