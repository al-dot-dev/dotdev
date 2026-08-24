import type { VNode } from 'vue'
import type { UiKitBaseProps } from '@dotdev/ui-kit'

//
// Layout
//

export interface UILayoutProps extends UiKitBaseProps {}

export interface UILayoutEmits {}

export interface UILayoutDefaultSlot {
  toggleSidebar: () => void
  isExpanded: boolean
  isMobile: boolean
}

export interface UILayoutSlots {
  default?(scope: UILayoutDefaultSlot): VNode[]
}

//
// LayoutSidebar
//

export type UILayoutSidebarMode = 'desktop' | 'mobile'

export interface UILayoutSidebarProps extends UiKitBaseProps {
  mode?: UILayoutSidebarMode
}

export interface UILayoutSidebarEmits {}

export interface UILayoutSidebarSlots {
  header?(): VNode[]
  default?(): VNode[]
  footer?(): VNode[]
}

//
// LayoutHeader
//

export interface UILayoutHeaderProps extends UiKitBaseProps {}

export interface UILayoutHeaderEmits {}

export interface UILayoutHeaderSlots {
  left?(): VNode[]
  default?(): VNode[]
  right?(): VNode[]
}

//
// LayoutContent
//

export interface UILayoutContentProps extends UiKitBaseProps {}

export interface UILayoutContentEmits {}

export interface UILayoutContentSlots {
  default?(): VNode[]
}
