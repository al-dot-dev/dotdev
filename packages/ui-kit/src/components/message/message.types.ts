import type { VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitColor, UiKitIcon, UiKitOverride } from '@dotdev/ui-kit'

export interface UIMessageProps extends UiKitBaseProps {
  icon?: UiKitIcon
  title?: string
  message?: string
  color?: UIMessageColor
  variant?: UIMessageVariant
  border?: boolean
  role?: UIMessageRole
}

export interface UIMessageSlots {
  icon?(): VNode[]
  title?(): VNode[]
  message?(): VNode[]
  default?(): VNode[]
}

export interface UIMessageEmits {}

export type UIMessageColor = UiKitOverride<UiKitColor, 'messageColor'>

export type UIMessageVariant = UiKitOverride<keyof UIMessageVariants, 'messageVariant'>
export interface UIMessageVariants {
  soft: true
  plain: true
}

export type UIMessageRole = 'status' | 'alert' | 'none'

declare const Message: DefineComponent<UIMessageProps, UIMessageSlots, EmitFn<UIMessageEmits>>
