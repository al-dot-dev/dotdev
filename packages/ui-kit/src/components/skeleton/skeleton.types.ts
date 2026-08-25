import type { DefineComponent, UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UISkeletonProps<T extends boolean = false> extends UiKitBaseProps {
  is?: UISkeletonElement
  variant?: UISkeletonVariant
  rounded?: boolean
  text?: T
  square?: T extends false ? boolean : never
  lines?: T extends true ? number : never
  loading?: boolean
  skeletonClass?: string
}

export interface UISkeletonSlots {
  default: () => void
}

export interface UISkeletonEmits {}

export type UISkeletonElement = keyof HTMLElementTagNameMap

export type UISkeletonVariant = UiKitOverride<keyof UISkeletonVariants, 'skeletonVariant'>
export interface UISkeletonVariants {
  pulse: true
  static: true
}

declare const Skeleton: DefineComponent<UISkeletonProps>
declare const SkeletonProvider: DefineComponent<UISkeletonProps>
