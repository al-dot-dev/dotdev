import type { VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitColor, UiKitOverride } from '@dotdev/ui-kit'

export interface UIBadgeProps extends UiKitBaseProps {
  color?: UIBadgeColor
  variant?: UIBadgeVariant
  dot?: boolean
  ring?: boolean
  label?: string
}

export interface UIBadgeSlots {
  default?(): VNode[]
}

export interface UIBadgeEmits {}

export type UIBadgeColor = UiKitOverride<UiKitColor, 'badgeColor'>

export type UIBadgeVariant = UiKitOverride<keyof UIBadgeVariants, 'badgeVariant'>
export interface UIBadgeVariants {
  soft: true
  solid: true
}

declare const Badge: DefineComponent<UIBadgeProps, UIBadgeSlots, EmitFn<UIBadgeEmits>>
