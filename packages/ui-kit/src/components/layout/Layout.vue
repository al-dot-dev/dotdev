<script lang="ts" setup>
import type { UILayoutEmits, UILayoutProps, UILayoutSlots } from './layout.types.ts'
import { useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { layoutStyle } from '@dotdev/theme'
import { computed } from 'vue'
import { useProvideLayoutScope } from './useLayoutScope.ts'
import { useProvideLayoutState } from './useLayoutState.ts'

defineEmits<UILayoutEmits>()
defineSlots<UILayoutSlots>()
const props = withDefaults(defineProps<UILayoutProps>(), {
  ui: 'layout',
})

const ui = useUiKitProps('layout', props)
const bem = useUiKitBem(ui)
useUiKitTheme(ui, layoutStyle)

const layout = useProvideLayoutState()
const scope = useProvideLayoutScope()

const rootClass = computed(() =>
  bem({
    'has-sidebar': scope.hasSidebar.value,
    'has-header': scope.hasHeader.value,
    root: layout.isRoot,
    [`sidebar-${layout.state.sidebarMode}`]: layout.isRoot,
    'sidebar-expanded': layout.isRoot && layout.state.isSidebarExpanded,
  }),
)
</script>

<template>
  <div :class="rootClass">
    <slot
      :is-expanded="layout.state.isSidebarExpanded"
      :isMobile="layout.state.sidebarMode === 'mobile'"
      :toggle-sidebar="layout.toggleSidebar"
    />
  </div>
</template>
