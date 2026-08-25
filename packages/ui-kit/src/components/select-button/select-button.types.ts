import type { VNode } from 'vue'
import type { ArrayModelConfig, DefineComponent, EmitFn, UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UISelectButtonProps<T = any, L = any, V = any, M = any>
  extends ArrayModelConfig<T, L, V, M>, UiKitBaseProps {
  size?: 'sm' | 'md' | 'lg'
  square?: boolean
  variant?: UiSelectButtonVariant
}

export interface UISelectButtonSlots<T = any> {
  default?(props: UISelectButtonSlotScope<T>): VNode[]
  prefix?(props: UISelectButtonSlotScope<T>): VNode[]
  suffix?(props: UISelectButtonSlotScope<T>): VNode[]
}

export interface UISelectButtonEmits {}

export interface UISelectButtonSlotScope<T> {
  option: T
  selected: boolean
  label: string
  index: number
}

export interface UiSelectButtonVariants {
  outlined: true
  soft: true
  plain: true
}
export type UiSelectButtonVariant = UiKitOverride<keyof UiSelectButtonVariants, 'selectButtonVariant'>

declare const SelectButton: DefineComponent<UISelectButtonProps, UISelectButtonSlots, EmitFn<UISelectButtonEmits>>
