export interface UiKitRegister {}

export type UiKitOverride<T, K extends string> = K extends keyof UiKitRegister ? UiKitRegister[K] : T

export interface UiKitBaseProps {
  namespace?: UiKitNamespace
  ui?: string
  el?: any
}

export type UiKitIcon = keyof UiKitOverride<keyof UiKitIcons, 'icons'>
export interface UiKitIcons {}

export type UiKitNamespace = UiKitOverride<keyof UiKitNamespaces, 'namespace'>
export interface UiKitNamespaces {
  d: true
}

export type UiKitSize = UiKitOverride<keyof UiKitSizes, 'size'>
export interface UiKitSizes {
  sm: true
  md: true
  lg: true
}

export type UiKitColor = UiKitOverride<keyof UiKitColors, 'color'>
export interface UiKitColors {
  primary: true
  neutral: true
  warning: true
  success: true
  danger: true
  info: true
}

export type UiKitFieldVariant = UiKitOverride<keyof UiKitFieldVariants, 'fieldVariant'>
export interface UiKitFieldVariants {
  outlined: true
  soft: true
  underlined: true
  plain: true
}
