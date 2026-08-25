import type { ClassValue, MaybeRefOrGetter, VNode } from 'vue'
import type { DefineComponent, EmitFn, HtmlLinkTarget, UiKitBaseProps, UiKitIcon } from '@dotdev/ui-kit'

export interface UIMenuItem {
  label?: string
  icon?: UiKitIcon
  to?: string
  href?: string
  target?: HtmlLinkTarget
  visible?: MaybeRefOrGetter<boolean>
  disabled?: MaybeRefOrGetter<boolean>
  active?: MaybeRefOrGetter<boolean>
  class?: MaybeRefOrGetter<ClassValue>
  command?: (item: NormalizedMenuItem, event?: Event) => void
  kind?: 'item' | 'divider' | 'heading'
}

export type NormalizedMenuItem = Resolved<UIMenuItem>

export interface UIMenuItemProps extends UiKitBaseProps {
  item: UIMenuItem
}

export interface UIMenuProps extends UiKitBaseProps {
  items: UIMenuItem[]
  size?: 'sm' | 'md' | 'lg'
}

export interface UIMenuSlots {
  default(): VNode[]
}

export interface UIMenuEmits {
  select: [item: NormalizedMenuItem, event?: Event]
}

type Resolved<T> = {
  [K in keyof T]: T[K] extends MaybeRefOrGetter<infer U> ? U : T[K]
}

declare const Menu: DefineComponent<UIMenuProps, UIMenuSlots, EmitFn<UIMenuEmits>>
declare const MenuItem: DefineComponent<UIMenuItemProps>
