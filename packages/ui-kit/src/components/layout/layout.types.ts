import type { VNode } from 'vue'
import type { UiKitBaseProps } from '@dotdev/ui-kit'

export interface UILayoutProps extends UiKitBaseProps {}

export interface UILayoutSlots {
  default?(): VNode[]
  body?(): VNode[]
}

export interface UILayoutEmits {}

export interface UILayoutSidebarProps extends UiKitBaseProps {}

export interface UILayoutSidebarSlots {
  header?(): VNode[]
  default?(): VNode[]
  footer?(): VNode[]
}

export interface UILayoutSidebarEmits {}

export interface UILayoutHeaderProps extends UiKitBaseProps {}

export interface UILayoutHeaderSlots {
  default?(): VNode[]
}

export interface UILayoutHeaderEmits {}
