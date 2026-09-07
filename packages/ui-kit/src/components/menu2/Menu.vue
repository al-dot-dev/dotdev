<script generic="T" lang="ts" setup>
import type { UIMenuEmits2, UIMenuProps2 } from './menu.types.ts'
import { NavigationList, useUiKit } from '@dotdev/ui-kit'
import { treeMenuStyle } from '@dotdev/theme'
import { computed } from 'vue'
import type { NavigationContext } from '../navigation/composables/useKeyboardNavigation.ts'

defineEmits<UIMenuEmits2<T>>()
// defineSlots<UIMenuSlots2<T>>()
const props = withDefaults(defineProps<UIMenuProps2<T>>(), {
  ui: 'tree-menu',
  items: () => [],
  depth: 0,
})

const { tui, ui, bem } = useUiKit('tree-menu', props, treeMenuStyle)
const rootClass = computed(() => bem([]))

function getLabel(item: T) {
  return String(ui.labelKey ? item[ui.labelKey] : item)
}

function onKeydown(context: NavigationContext<T> & { key: string }) {
  if (['Enter', 'Space'].includes(context.event.code)) {
    ui.onCommand?.(context.item!, context.event)
    return true
  }
}
</script>

<template>
  <NavigationList
    :children-key="tui.childrenKey"
    :class="rootClass"
    :disabled="tui.disabled"
    :disabled-item="tui.disabledItem"
    :items="tui.items"
    @keydown="onKeydown"
  >
    <template #item="{ focused, item, disabled }">
      <button :class="bem('item', { focused, disabled })" tabindex="-1" @click="tui.onCommand?.(item, $event)">
        {{ getLabel(item) }}
      </button>
    </template>

    <template #children="{ items, item, rootEl, itemEl }">
      <slot :item="item" :item-el="itemEl" :props="{ ...props, items }" :root-el="rootEl" name="children">
        <Menu v-bind="{ ...props, items }" />
      </slot>
    </template>
  </NavigationList>
</template>
