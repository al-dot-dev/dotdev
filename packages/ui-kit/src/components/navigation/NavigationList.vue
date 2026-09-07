<script generic="T" lang="ts" setup>
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import NavigationItem from './NavigationItem.vue'
import { useNavigationContext } from './composables/useNavigationContext.ts'
import { type NavigationContext, useKeyboardNavigation } from './composables/useKeyboardNavigation.ts'

interface Props {
  items: T[]
  childrenKey?: keyof T
  disabled?: boolean
  disabledItem?: (item: T) => boolean
  onKeydown?: (context: NavigationContext<T> & { key: string }) => void | true
}

const props = defineProps<Props>()

const { navigation, branch, isRoot, hasFocus, isActive } = useNavigationContext<T>({
  tree: () => props.items,
  childrenKey: () => props.childrenKey,
  disabled: () => props.disabled,
})

const rootElement = useTemplateRef('root')

const { onKeydown } = useKeyboardNavigation({
  focusedIndex: navigation.index,
  items: navigation.paths,
  onKeydown(context) {
    if (!context.item) return

    const key = context.item
    const item = navigation.getItem(key)

    console.log(key, navigation.instances.get(key))

    return props.onKeydown?.({ ...context, item, key })
  },
})

watch(isActive, (focused) => focused && rootElement.value?.focus(), { immediate: true })

onMounted(() => {
  rootElement.value?.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  rootElement.value?.removeEventListener('keydown', onKeydown)
})

function getItemChildren(item: T): T[] {
  if (!props.childrenKey) return []
  return (item[props.childrenKey] as T[]) ?? []
}
</script>

<template>
  <ul
    ref="root"
    :tabindex="isRoot ? 0 : -1"
    @blur="navigation.hasFocus.value = false"
    @focus="navigation.hasFocus.value = true"
  >
    <NavigationItem
      v-for="(item, index) in items"
      :key="index"
      #default="{ focused, disabled, key, element }"
      :disabled="branch.disabled || disabledItem?.(item)"
      :index="index"
    >
      <slot
        :key="key"
        :disabled="disabled"
        :focused="hasFocus && focused"
        :index="index"
        :item="item"
        :item-el="element"
        :root-el="rootElement"
        name="item"
      />

      <slot
        v-if="getItemChildren(item).length"
        :key="key"
        :disabled="disabled"
        :focused="hasFocus && focused"
        :index="index"
        :item="item"
        :item-el="element"
        :items="getItemChildren(item)"
        :root-el="rootElement"
        name="children"
      />
    </NavigationItem>
  </ul>
</template>
