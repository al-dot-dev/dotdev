import type { DefineComponent, EmitFn, UiKitBaseProps, UiKitColor, UiKitOverride } from '@dotdev/ui-kit'

export interface UIProgressProps extends UiKitBaseProps {
  value?: number
  max?: number
  color?: UIProgressColor
}

export interface UIProgressSlots {}

export interface UIProgressEmits {}

export type UIProgressColor = UiKitOverride<UiKitColor, 'progressColor'>

declare const Progress: DefineComponent<UIProgressProps, UIProgressSlots, EmitFn<UIProgressEmits>>
