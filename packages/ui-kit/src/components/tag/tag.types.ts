import type { VNode } from 'vue'
import type {
  DefineComponent,
  EmitFn,
  UiKitBaseProps,
  UiKitColor,
  UiKitIcon,
  UiKitOverride,
  UITagElement,
} from '@dotdev/ui-kit'

export interface UITagProps extends UiKitBaseProps {
  is?: UITagElement
  label?: string
  rounded?: boolean
  border?: boolean
  prefixIcon?: UiKitIcon
  suffixIcon?: UiKitIcon
  color?: UITagColor
  variant?: UITagVariant
}

export interface UITagSlots {
  label?(): VNode[]
  prefix?(): VNode[]
  default?(): VNode[]
  suffix?(): VNode[]
}

export interface UITagEmits {}

export type UITagColor = UiKitOverride<UiKitColor, 'tagColor'>

export type UITagVariant = UiKitOverride<keyof UiKitTagVariants, 'tagVariant'>
export interface UiKitTagVariants {
  soft: true
  solid: true
  plain: true
}

declare const Tag: DefineComponent<UITagProps, UITagSlots, EmitFn<UITagEmits>>
