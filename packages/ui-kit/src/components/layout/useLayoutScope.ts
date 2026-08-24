import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

/**
 * Parts currently rendered inside a single `<Layout>` instance.
 * Unlike the tree-wide layout state, a scope is never inherited by nested layouts.
 */
export interface LayoutScope {
  registerSidebar: () => void
  registerHeader: () => void
}

const LAYOUT_SCOPE_KEY: InjectionKey<LayoutScope> = Symbol('dotdev-layout-scope')

export interface UseProvideLayoutScopeReturn {
  hasSidebar: Ref<boolean>
  hasHeader: Ref<boolean>
}

/** Called by `<Layout>` to accept part registrations and expose presence flags. */
export function useProvideLayoutScope(): UseProvideLayoutScopeReturn {
  const hasSidebar = ref(false)
  const hasHeader = ref(false)

  const scope: LayoutScope = {
    registerSidebar: () => {
      hasSidebar.value = true
    },
    registerHeader: () => {
      hasHeader.value = true
    },
  }

  provide(LAYOUT_SCOPE_KEY, scope)

  return { hasSidebar, hasHeader }
}

/** Called by layout parts to register themselves in the closest ancestor `<Layout>`. */
export function useLayoutScope(): LayoutScope | null {
  return inject(LAYOUT_SCOPE_KEY, null)
}
