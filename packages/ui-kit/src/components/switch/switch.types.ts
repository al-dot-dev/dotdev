import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'
import type { VNode } from 'vue'

export interface UISwitchProps extends UiKitBaseProps {
  disabled?: boolean
  invalid?: boolean
  variant?: UISwitchVariant
}

export interface UiKitSwitchVariants {
  outlined: true
  soft: true
}
export type UISwitchVariant = UiKitOverride<keyof UiKitSwitchVariants, 'switchVariant'>

export interface UISwitchSlots {
  default(): VNode[]
}

export interface UISwitchEmits {}

declare const Switch: DefineComponent<UISwitchProps, UISwitchSlots, EmitFn<UISwitchEmits>>
