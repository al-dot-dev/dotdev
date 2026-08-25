import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitOverride, UiKitSize } from '@dotdev/ui-kit'

export interface UICheckboxProps extends UiKitBaseProps {
  size?: UICheckboxSize
  invalid?: boolean
  disabled?: boolean
  variant?: UICheckboxVariant
}

export interface UICheckboxSlots {}
export interface UICheckboxEmits {}

export type UICheckboxSize = UiKitOverride<UiKitSize, 'checkboxSize'>

export interface UiKitCheckboxVariants {
  outlined: true
  soft: true
}
export type UICheckboxVariant = UiKitOverride<keyof UiKitCheckboxVariants, 'checkboxVariant'>

declare const Checkbox: DefineComponent<UICheckboxProps, UICheckboxSlots, EmitFn<UICheckboxEmits>>
