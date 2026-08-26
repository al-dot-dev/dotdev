import type { Ref, VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps } from '@dotdev/ui-kit'

export interface UIDrawerProps extends UiKitBaseProps {
  title?: string
  description?: string
  closable?: boolean
  modelValue?: boolean
  dismissable?: boolean
  closeOnEscape?: boolean
  placement?: UIDrawerPlacement
  canClose?: () => boolean | Promise<boolean>
}

export interface UIDrawerSlots {
  header?(): VNode[]
  default?(): VNode[]
  footer?(): VNode[]
  close?(): VNode[]
}

export interface UIDrawerEmits {
  'update:modelValue': [value: boolean]
  open: []
  close: []
}

export interface UIDrawerExpose {
  isVisible: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

export type UIDrawerPlacement =
  'left' | 'right' | 'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

declare const Drawer: DefineComponent<UIDrawerProps, UIDrawerSlots, EmitFn<UIDrawerEmits>>
