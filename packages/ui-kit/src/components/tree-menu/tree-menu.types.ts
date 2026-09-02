import { type Component, type Events, type Ref, type VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UITreeMenuProps<T = unknown> extends UiKitBaseProps, UITreeMenuBaseProps<T> {
  disabledItem?: (item: T) => boolean
  expandedItem?: (item: T) => boolean
  onExpand?: (item: T) => void
  onCollapse?: (item: T) => void
  root?: boolean
}

interface Adapter<T = unknown> {
  component?: (item: T) => Component | undefined
  bind?: (item: T) => Record<string, unknown>
}

export interface UITreeMenuBaseProps<T = unknown> {
  items?: T[]
  size?: UITreeMenuSize
  childrenKey?: keyof T
  labelKey?: keyof T
  adapter?: Adapter<T>
}

export interface UITreeMenuSlots<T = unknown> {
  label?(scope: { label?: string; item: T }): VNode[]
  children?(scope: UITreeMenuSlotScope<T>): VNode[]
  adapter?(scope: { component: () => Component }): VNode[]
}

export type UITreeMenuEmits<T = unknown> = UITreeMenuItemEmits<T> & {}

export type UITreeMenuItemEmits<T = unknown> = /* @vue-ignore */ {
  [E in keyof Events as `item:${E}`]: [item: T]
}

export interface UITreeMenuSlotScope<T = unknown> {
  item: T
  items: T[]
  anchor: Ref<HTMLElement | undefined>
  bind: any
  label: string
  Children: VNode | null
}

export type UITreeMenuSize = UiKitOverride<keyof UITreeMenuSizes, 'treeMenuSize'>
export interface UITreeMenuSizes {
  sm: true
  md: true
  lg: true
}

declare const TreeMenu: DefineComponent<UITreeMenuProps, UITreeMenuSlots, EmitFn<UITreeMenuEmits>>
