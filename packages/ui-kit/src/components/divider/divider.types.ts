import type { VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitColor, UiKitOverride } from '@dotdev/ui-kit'

export interface UIDividerProps extends UiKitBaseProps {
  orientation?: UIDividerOrientation
  variant?: UIDividerVariant
  color?: UIDividerColor
  label?: string
}

export interface UIDividerSlots {
  default?(): VNode[]
}

export interface UIDividerEmits {}

export type UIDividerOrientation = 'horizontal' | 'vertical'

export type UIDividerColor = UiKitOverride<UiKitColor, 'dividerColor'>

export type UIDividerVariant = UiKitOverride<keyof UIDividerVariants, 'dividerVariant'>
export interface UIDividerVariants {
  solid: true
  dashed: true
  dotted: true
}

declare const Divider: DefineComponent<UIDividerProps, UIDividerSlots, EmitFn<UIDividerEmits>>
