import type { VNode } from 'vue'
import type {
  ArrayModelConfig,
  DefineComponent,
  EmitFn,
  UiKitBaseProps,
  UiKitFieldVariant,
  UiKitOverride,
  UiKitSize,
  UIListBoxSlotScope,
} from '@dotdev/ui-kit'

export interface UISelectProps<T = any, L = any, V = any, M = any>
  extends ArrayModelConfig<T, L, V, M>, UiKitBaseProps {
  size?: UISelectSize
  name?: string
  invalid?: boolean
  placeholder?: string
  variant?: UISelectVariant
}

export interface UISelectSlots<T = any> {
  default?(props: UIListBoxSlotScope<T>): VNode[]
}

export interface UISelectEmits {}

export type UISelectSize = UiKitOverride<UiKitSize, 'selectSize'>
export type UISelectVariant = UiKitOverride<UiKitFieldVariant, 'selectVariant'>

declare const Select: DefineComponent<UISelectProps, UISelectSlots, EmitFn<UISelectEmits>>
