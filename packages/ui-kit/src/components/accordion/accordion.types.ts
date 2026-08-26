import type {
  ArrayModelConfig,
  DefineComponentCtx,
  DefineComponentExpose,
  DefineComponentProps,
  DefineComponentReturn,
  DefineComponentSetup,
  UiKitBaseProps,
  UiKitOverride,
} from '@dotdev/ui-kit'

export interface UIAccordionProps<T = any, L = any, V = any, M = any>
  extends ArrayModelConfig<T, L, V, M>, UiKitBaseProps {
  variant?: UIAccordionVariant
  modelValue?: M extends true ? T[] : T | undefined
}

export interface UIAccordionSlots<T> {
  default(scope: UIAccordionSlotsScope<T>): void
  content(scope: UIAccordionSlotsScope<T>): void
  indicator(scope: UIAccordionSlotsScope<T>): void
}

export interface UIAccordionEmits<T, M> {
  'update:modelValue'?: (value: M extends true ? T[] : T | undefined) => void
}

export interface UIAccordionExpose<T> {
  toggle: (item: T) => void
}

export interface UIAccordionSlotsScope<T> {
  expanded: boolean
  disabled: boolean
  toggle: () => void
  item: T
  label: string
  value: string
  index: number
}

export type UIAccordionVariant = UiKitOverride<keyof UIAccordionVariants, 'accordionVariant'>
export interface UIAccordionVariants {
  outlined: true
  soft: true
  plain: true
  underline: true
}

declare const Accordion: <T, L extends keyof T, V extends keyof T, M extends boolean = false>(
  props: DefineComponentProps<UIAccordionProps<T, L, V, M>, UIAccordionEmits<T, M>>,
  ctx?: DefineComponentCtx<UIAccordionSlots<T>, UIAccordionExpose<T>>,
  expose?: DefineComponentExpose,
  setup?: DefineComponentSetup<
    UIAccordionProps<T, L, V, M>,
    UIAccordionSlots<T>,
    UIAccordionEmits<T, M>,
    UIAccordionExpose<T>
  >,
) => DefineComponentReturn<typeof setup>
