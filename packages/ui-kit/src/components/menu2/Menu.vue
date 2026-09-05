<script generic="T" lang="ts" setup>
import type { UIMenuEmits2, UIMenuProps2, UIMenuSlots2 } from './menu.types.ts'
import { useUiKit } from '@dotdev/ui-kit'
import { treeMenuStyle } from '@dotdev/theme'
import { computed, getCurrentInstance, useTemplateRef } from 'vue'
import Navigate from './navigate-list/Navigate.vue'
import NavigateItem from './navigate-list/NavigateItem.vue'

defineEmits<UIMenuEmits2<T>>()
defineSlots<UIMenuSlots2<T>>()
const props = withDefaults(defineProps<UIMenuProps2<T>>(), {
  ui: 'tree-menu',
  items: () => [],
  depth: 0,
})

const { bem } = useUiKit('tree-menu', props, treeMenuStyle)
const rootClass = computed(() => bem([]))

const nav = useTemplateRef('nav')
const root = useTemplateRef('root')

const id = getCurrentInstance()?.uid

function onKeydown(event: KeyboardEvent) {
  console.log(id)
}

defineExpose({
  onKeydown,
})
</script>

<template>
  <Navigate ref="nav" :depth="depth" :disabled="depth === 1" :root="root">
    <ul ref="root" :class="rootClass" :tabindex="depth === 0 ? 0 : -1" @focusin="nav?.ensureFocus">
      <NavigateItem
        v-for="(item, idx) in items"
        :key="idx"
        #default="{ focused }"
        :disabled="disabledItem?.(item)"
        :index="idx"
        :item="item"
      >
        <li>
          <button :class="bem('item', { focused })" tabindex="-1">
            {{ labelKey ? item[labelKey] : item }} {{ depth }}
          </button>

          <template v-if="childrenKey && item[childrenKey]?.length">
            <Menu v-bind="{ ...props, depth: depth + 1, items: (item[childrenKey] as T[]) ?? [] }" />
          </template>
        </li>
      </NavigateItem>
    </ul>
  </Navigate>
</template>
