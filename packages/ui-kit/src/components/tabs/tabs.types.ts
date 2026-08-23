import type { VNode } from 'vue'
import type { UiKitBaseProps, UiKitOverride, UiKitSize } from '@dotdev/ui-kit'

export interface UITabsProps<T = any, L = any, V = any> extends UiKitBaseProps {
  options: T[]
  labelKey?: L
  valueKey?: V
  size?: UiKitSize
  variant?: UITabsVariant
  disabled?: boolean
  optionDisabled?: (option: T) => boolean
  /** Select the focused tab automatically while navigating with arrow keys */
  activateOnFocus?: boolean
}

export interface UITabsEmits {}

export interface UITabsSlotScope<T> {
  option: T
  label: string
  value: string
  index: number
  selected: boolean
}

export interface UITabsSlots<T> {
  item?(props: UITabsSlotScope<T>): VNode[]
  panel?(props: UITabsSlotScope<T>): VNode[]
}

interface UITabsVariants {
  underlined: true
  soft: true
  outlined: true
}

type UITabsVariantDefault = keyof UITabsVariants | (string & {})

export type UITabsVariant = UiKitOverride<UITabsVariantDefault, 'tabsVariant'>
