import type { VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UIPaginationProps extends UiKitBaseProps {
  size?: UIPaginationSize
  total?: number
  pageSize?: number
  siblingCount?: number
  disabled?: boolean
  ariaLabel?: string
}

export interface UIPaginationSlots {
  item?(props: { page: number; selected: boolean }): VNode[]
  prev?(props: { disabled: boolean }): VNode[]
  next?(props: { disabled: boolean }): VNode[]
  ellipsis?(): VNode[]
}

export interface UIPaginationEmits {
  change: [page: number]
}

export interface UiKitPaginationSizes {
  sm: true
  md: true
  lg: true
}
export type UIPaginationSize = UiKitOverride<keyof UiKitPaginationSizes, 'paginationSize'>

declare const Pagination: DefineComponent<UIPaginationProps, UIPaginationSlots, EmitFn<UIPaginationEmits>>
