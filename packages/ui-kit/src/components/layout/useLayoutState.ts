import type { InjectionKey } from 'vue'
import { inject, provide, reactive } from 'vue'
import type { UILayoutSidebarMode } from './layout.types.ts'

/**
 * Tree-wide layout state shared between `<Layout>` and its parts.
 * Created by the outermost `<Layout>` and inherited by nested ones.
 */
export interface LayoutState {
  isSidebarExpanded: boolean
  sidebarMode: UILayoutSidebarMode
}

const LAYOUT_STATE_KEY: InjectionKey<LayoutState> = Symbol('dotdev-layout-state')

function createLayoutState(): LayoutState {
  return reactive<LayoutState>({
    isSidebarExpanded: true,
    sidebarMode: 'desktop',
  })
}

export interface UseProvideLayoutStateReturn {
  state: LayoutState
  /** Whether this instance created the state, i.e. it is the outermost `<Layout>`. */
  isRoot: boolean
  toggleSidebar: () => void
}

/** Injects the closest layout state or creates one for a new layout tree, and provides it downstream. */
export function useProvideLayoutState(): UseProvideLayoutStateReturn {
  const inherited = inject(LAYOUT_STATE_KEY, null)
  const state = inherited ?? createLayoutState()

  provide(LAYOUT_STATE_KEY, state)

  return {
    state,
    isRoot: inherited === null,
    toggleSidebar() {
      state.isSidebarExpanded = !state.isSidebarExpanded
    },
  }
}

/** Accesses the layout state of the closest ancestor `<Layout>`. */
export function useLayoutState(): LayoutState {
  const state = inject(LAYOUT_STATE_KEY, null)

  if (!state) {
    console.warn('[dotdev/ui-kit] layout state not found, make sure a <Layout> wraps the component')
    return createLayoutState()
  }

  return state
}
