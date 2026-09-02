import type { VNode } from 'vue'
import type { DefineComponent, EmitFn } from '@dotdev/ui-kit'

export type UICollapseProps = {}

export type UICollapseSlots = {
  default(scope: {}): VNode[]
}

export interface UICollapseEmits {}

declare const Collapse: DefineComponent<UICollapseProps, UICollapseSlots, EmitFn<UICollapseEmits>>
