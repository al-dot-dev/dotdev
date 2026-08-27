import type { VNode } from 'vue'
import type { DefineComponent, EmitFn, UiKitBaseProps } from '@dotdev/ui-kit'

export interface UIFlexProps extends UiKitBaseProps, /* @vue-ignore */ UiFlexPropsWithMedia {}

export interface UiFlexPropsWithMedia extends UiFlexProps, UIFlexMedia {}

interface UiFlexProps {
  align?: UIFlexAlign
  justify?: UIFlexJustify
  direction?: UIFlexDirection
  content?: UIFlexContent
  self?: UIFlexSelf
  wrap?: UIFlexWrap | boolean
  center?: boolean
  inline?: boolean
  gap?: string
  grow?: string | boolean
  shrink?: string | boolean
  basis?: string
  order?: string
}

export interface UIFlexSlots {
  default?(): VNode[]
}

export interface UIFlexEmits {}

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type UIFlexMedia = {
  [K in keyof UiFlexProps as `${Breakpoint}:${K & string}`]?: UiFlexProps[K]
}

type UIFlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse'
type UIFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
type UIFlexJustify = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'
type UIFlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
type UIFlexContent = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'baseline' | 'stretch'
type UIFlexSelf = 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'

declare const Flex: DefineComponent<UIFlexProps, UIFlexSlots, EmitFn<UIFlexEmits>>
