import type { Ref, VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps } from '@dotdev/ui-kit'

export interface UIDialogProps extends UiKitBaseProps {
  title?: string
  closable?: boolean
  modelValue?: boolean
  dismissable?: boolean
  closeOnEscape?: boolean
  placement?: UIDialogPlacement
  canClose?: () => boolean | Promise<boolean>
}

export interface UIDialogSlots {
  header?(): VNode[]
  default?(): VNode[]
  footer?(): VNode[]
  close?(): VNode[]
}

export interface UIDialogEmits {
  'update:modelValue': [value: boolean]
  open: []
  close: []
}

export interface UIDialogExpose {
  isVisible: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

export type UIDialogPlacement =
  'left' | 'right' | 'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

declare const Dialog: DefineComponent<UIDialogProps, UIDialogSlots, EmitFn<UIDialogEmits>>
