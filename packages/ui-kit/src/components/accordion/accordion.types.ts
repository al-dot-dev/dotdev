import type { ArrayModelConfig, DefineComponent, UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UIAccordionProps<T = any, L = any, V = any, M = any>
  extends ArrayModelConfig<T, L, V, M>, UiKitBaseProps {
  variant?: UIAccordionVariant
}

export interface UIAccordionSlotsScope<T> {
  open: boolean
  disabled: boolean
  toggle: () => void
  item: T
  label: string
  value: string
  index: number
}

export interface UIAccordionSlots<T> {
  default(scope: UIAccordionSlotsScope<T>): void
  content(scope: UIAccordionSlotsScope<T>): void
  indicator(scope: UIAccordionSlotsScope<T>): void
}

export interface UIAccordionEmits {}

export type UIAccordionVariant = UiKitOverride<keyof UIAccordionVariants, 'accordionVariant'>
export interface UIAccordionVariants {
  outlined: true
  soft: true
  plain: true
  underline: true
}

declare const Accordion: DefineComponent<UIAccordionProps>
declare const Collapse: DefineComponent<UIAccordionProps>
