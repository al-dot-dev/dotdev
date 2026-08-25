export interface UiKitRegister {}

export type UiKitOverride<T, K extends string> = K extends keyof UiKitRegister ? UiKitRegister[K] : T

export interface UiKitBaseProps {
  namespace?: UiKitNamespace
  ui?: string
}

export interface UiKitIcons {}
export type UiKitIcon = keyof UiKitOverride<keyof UiKitIcons, 'icons'>

export interface UiKitNamespaces {
  d: true
}
export type UiKitNamespace = UiKitOverride<keyof UiKitNamespaces, 'namespace'>

export interface UiKitSizes {
  sm: true
  md: true
  lg: true
}
export type UiKitSize = UiKitOverride<keyof UiKitSizes, 'size'>

export interface UiKitColors {
  primary: true
  neutral: true
  warning: true
  success: true
  danger: true
  info: true
}
export type UiKitColor = UiKitOverride<keyof UiKitColors, 'color'>

export interface UiKitFieldVariants {
  outlined: true
  soft: true
  underlined: true
  plain: true
}
export type UiKitFieldVariant = UiKitOverride<keyof UiKitFieldVariants, 'fieldVariant'>
