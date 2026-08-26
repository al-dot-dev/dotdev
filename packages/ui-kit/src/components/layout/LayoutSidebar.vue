<script lang="ts" setup>
import type { UILayoutSidebarEmits, UILayoutSidebarProps, UILayoutSidebarSlots } from './layout.types.ts'
import { useMediaQuery, useUiKit } from '@dotdev/ui-kit'
import { watchEffect } from 'vue'
import { useLayoutScope } from './useLayoutScope.ts'
import { useLayoutState } from './useLayoutState.ts'

defineEmits<UILayoutSidebarEmits>()
defineSlots<UILayoutSidebarSlots>()
const props = withDefaults(defineProps<UILayoutSidebarProps>(), {
  ui: 'layout-sidebar',
  mode: 'desktop',
})

const { ui, bem } = useUiKit('layout-sidebar', props)

const state = useLayoutState()
useLayoutScope()?.registerSidebar()

const isMobile = useMediaQuery('(max-width: 1024px)')
watchEffect(() => {
  const mode = isMobile.value ? 'mobile' : ui.mode
  state.sidebarMode = mode
  if (mode === 'mobile') state.isSidebarExpanded = false
})

function closeOnBackdrop() {
  state.isSidebarExpanded = false
}
</script>

<template>
  <transition name="layout-sidebar">
    <aside v-show="state.isSidebarExpanded" :class="bem()" v-bind="el" @click="closeOnBackdrop">
      <div :class="bem('wrapper')" @click.stop>
        <div v-if="$slots.header" :class="bem('header')">
          <slot name="header" />
        </div>

        <div :class="bem('body')">
          <slot />
        </div>

        <footer v-if="$slots.footer" :class="bem('footer')">
          <slot name="footer" />
        </footer>
      </div>
    </aside>
  </transition>
</template>
