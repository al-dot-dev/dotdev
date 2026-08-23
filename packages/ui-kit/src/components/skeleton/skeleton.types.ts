import type { InjectionKey } from 'vue'
import type { UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

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

export type UISkeletonVariant = UiKitOverride<UISkeletonVariantDefault, 'skeletonVariant'>
type UISkeletonVariantDefault = keyof UISkeletonVariants | (string & {})
interface UISkeletonVariants {
  pulse: true
  static: true
}

export const SKELETON_PROVIDE_KEY: InjectionKey<() => boolean> = Symbol('skeleton-provider')
