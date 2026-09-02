import type { CSSProperties, VNode, VNodeRef } from 'vue'
import type { DefineComponent, EmitFn, UICollapseConfig } from '@dotdev/ui-kit'

export type UICollapseFn = (event?: Event) => void
export interface UICollapseProps extends UICollapseConfig {
  fit?: boolean
  dismissable?: boolean
}

export interface UICollapseSlots {
  default(scope: {
    isOpen: boolean
    ref: VNodeRef | undefined
    style: CSSProperties
    open: UICollapseFn
    close: UICollapseFn
    toggle: UICollapseFn
  }): VNode[]
}

export interface UICollapseEmits {
  'click-outside': [event: MouseEvent]
}

declare const Collapse: DefineComponent<UICollapseProps, UICollapseSlots, EmitFn<UICollapseEmits>>
