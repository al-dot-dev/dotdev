<script generic="T, S extends object" lang="ts" setup>
import type { UIListSharedProps, UIListSlots, UIListSlotScope } from './list.types.ts'
import { ComponentOrSlot, Scope } from '@dotdev/ui-kit'

defineSlots<UIListSlots<T, S>>()
const props = withDefaults(defineProps<UIListSharedProps<T, S>>(), {
  items: () => [],
})

function getValue<K extends keyof T>(item: T, key?: K): T[K] | undefined {
  return key ? item[key] : undefined
}

function getLabel(item: T): string {
  const value = getValue(item, props.labelKey)
  return value !== undefined ? String(value) : String(item)
}

function getKey(item: T, index: number): string {
  const value = getValue(item, props.itemKey)
  return value !== undefined ? String(value) : String(index)
}

function getChildren(item: T): T[] {
  if (!props.childrenKey) return []
  return item[props.childrenKey] as T[]
}

function buildItemScope(item: T, index: number): UIListSlotScope<T, S> {
  return {
    item,
    index,
    key: getKey(item, index),
    label: getLabel(item),
    children: getChildren(item),
    ...(props.scope?.(item, index) as S),
  }
}
</script>

<template>
  <ComponentOrSlot :is="props.is">
    <Scope
      v-for="(item, index) in props.items"
      :key="getKey(item, index)"
      #default="scope"
      :scope="buildItemScope(item, index)"
    >
      <slot v-bind="scope" />
    </Scope>
  </ComponentOrSlot>
</template>
