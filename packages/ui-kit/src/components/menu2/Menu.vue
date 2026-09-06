<script generic="T" lang="ts" setup>
import type { UIMenuEmits2, UIMenuProps2, UIMenuSlots2 } from './menu.types.ts'
import { NavigationContext, NavigationItem, useUiKit } from '@dotdev/ui-kit'
import { treeMenuStyle } from '@dotdev/theme'
import { computed } from 'vue'

defineEmits<UIMenuEmits2<T>>()
defineSlots<UIMenuSlots2<T>>()
const props = withDefaults(defineProps<UIMenuProps2<T>>(), {
  ui: 'tree-menu',
  items: () => [],
  depth: 0,
})

const { ui, tui, bem } = useUiKit('tree-menu', props, treeMenuStyle)
const rootClass = computed(() => bem([]))

function getChildren(item: T) {
  if (!ui.childrenKey) return []
  return (item[ui.childrenKey] as T[]) ?? []
}
</script>

<template>
  <ul ref="root" :class="rootClass" tabindex="0">
    <NavigationContext :children-key="tui.childrenKey" :disabled="tui.disabled" :tree="tui.items">
      <NavigationItem
        v-for="(item, idx) in items"
        :key="idx"
        #default="{ focused }"
        :disabled="disabledItem?.(item)"
        :index="idx"
      >
        <li>
          <button :class="bem('item', { focused })" tabindex="-1">{{ labelKey ? item[labelKey] : item }}</button>

          <template v-if="getChildren(item).length">
            <Menu v-bind="{ ...props, items: getChildren(item) }" />
          </template>
        </li>
      </NavigationItem>
    </NavigationContext>
  </ul>
</template>
