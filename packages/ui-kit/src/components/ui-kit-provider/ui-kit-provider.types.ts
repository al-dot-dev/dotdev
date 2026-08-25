import type { VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitNamespace } from '@dotdev/ui-kit'

export interface UIKitProviderProps {
  namespace: UiKitNamespace
}

export interface UIKitProviderSlots {
  default?(): VNode[]
}

export interface UIKitProviderEmits {}

declare const UiKitProvider: DefineComponent<UIKitProviderProps, UIKitProviderSlots, EmitFn<UIKitProviderEmits>>
