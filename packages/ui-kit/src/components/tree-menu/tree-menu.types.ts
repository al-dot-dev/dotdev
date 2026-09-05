import type { Ref, VNode, VNodeRef } from 'vue'
import type { DefineComponent, EmitFn, LowercaseElementEvents, UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UITreeMenuProps<T = unknown> extends UiKitBaseProps {
  items?: T[]
  size?: UITreeMenuSize
  childrenKey?: keyof T
  labelKey?: keyof T
  disabledItem?: (item: T) => boolean
  expandedItem?: (item: T) => boolean
  itemAttrs?: (item: T) => Record<string, unknown>
  focusedItem?: T
}

export interface UITreeMenuSlots<T = unknown> {
  item?(scope: UITreeMenuSlotScope<T>): VNode[]
  label?(scope: UITreeMenuSlotScope<T>): VNode[]
  children?(scope: UITreeMenuSlotScope<T>): VNode[]
}

export type UITreeMenuEmits<T = unknown> = UITreeMenuItemEmits<T> & {
  expand: [item: T]
  collapse: [item: T]
}

export type UITreeMenuItemEmits<T = unknown> = /* @vue-ignore */ {
  [E in keyof LowercaseElementEvents as `item:${E}`]: [item: T, event: LowercaseElementEvents[E]]
}

export interface UITreeMenuSlotScope<T = unknown> {
  item: T
  children: T[]
  element: Ref<HTMLElement | undefined>
  ref: VNodeRef
  label: string
  NestedMenu: VNode | null
}

export type UITreeMenuSize = UiKitOverride<keyof UITreeMenuSizes, 'treeMenuSize'>
export interface UITreeMenuSizes {
  sm: true
  md: true
  lg: true
}

declare const TreeMenu: DefineComponent<UITreeMenuProps, UITreeMenuSlots, EmitFn<UITreeMenuEmits>>
