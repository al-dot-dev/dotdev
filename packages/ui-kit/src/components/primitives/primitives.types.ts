import type { UiKitBaseProps } from '@dotdev/ui-kit'

export interface UIBoxProps extends UiKitBaseProps, /* @vue-ignore */ UiKitBoxProps {}

export interface UIBoxSlots {
  default?(): any
}

export interface UIBoxEmits {}

/**
 * Универсальный примитив-контейнер. Стили генерирует плагин `dotdev-ui-css`:
 * каждый объявленный пропс маппится в tailwind-класс, как есть (за значения не
 * отвечаем). Чужие атрибуты (id, aria-*, data-*, @click и т.п.) не попадают в
 * CSS — они уходят в $attrs на корневой элемент.
 */
export interface UiKitBoxProps extends UiKitBoxCore, UiKitBoxMedia, UiKitBoxVariants {}

type BoxBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type UiKitBoxMedia = {
  [K in keyof UiKitBoxCore as `${BoxBreakpoint}:${K & string}`]?: UiKitBoxCore[K]
}

type BoxVariant = 'hover' | 'focus' | 'focus-visible' | 'focus-within' | 'active' | 'disabled'

type UiKitBoxVariants = {
  [K in keyof UiKitBoxCore as `${BoxVariant}:${K & string}`]?: UiKitBoxCore[K]
}

export interface UiKitBoxCore {
  // display / visibility
  display?: UIBoxDisplay
  hidden?: boolean
  visible?: boolean

  // positioning
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  inset?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
  float?: 'start' | 'end' | 'none'
  z?: string

  // flex
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
  wrap?: boolean | 'nowrap' | 'wrap-reverse'
  inline?: boolean
  justify?: UIBoxJustify
  align?: UIBoxAlign
  content?: UIBoxContent
  self?: UIBoxSelf
  order?: string
  center?: boolean
  gap?: string
  grow?: string | boolean
  shrink?: string | boolean
  basis?: string

  // grid
  cols?: string
  rows?: string
  flow?: UIBoxFlow
  autoCols?: string
  autoRows?: string
  placeItems?: UIBoxAlign
  placeSelf?: UIBoxSelf
  placeContent?: UIBoxContent

  // sizing
  w?: string
  h?: string
  minW?: string
  minH?: string
  maxW?: string
  maxH?: string
  size?: string
  aspect?: string

  // spacing
  p?: string
  px?: string
  py?: string
  pt?: string
  pr?: string
  pb?: string
  pl?: string
  m?: string
  mx?: string
  my?: string
  mt?: string
  mr?: string
  mb?: string
  ml?: string
  spaceX?: string
  spaceY?: string

  // overflow / scroll
  overflow?: UIBoxOverflow
  overflowX?: UIBoxOverflow
  overflowY?: UIBoxOverflow
  overscroll?: 'auto' | 'contain' | 'none'

  // visual
  bg?: string
  border?: string | boolean
  borderColor?: string
  borderStyle?: UIBoxBorderStyle
  rounded?: string
  shadow?: string
  ring?: string
  outline?: string
  opacity?: string | number

  // misc
  cursor?: string
  select?: 'none' | 'text' | 'all' | 'auto'
  pointerEvents?: boolean
  resize?: boolean | 'none' | 'y' | 'x'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  transition?: string
  animate?: string

  // привязка сгенерированного класса
  $class?: string
}

type UIBoxDisplay =
  | 'block'
  | 'inline-block'
  | 'inline'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'flow-root'
  | 'contents'
  | 'none'

type UIBoxJustify = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch' | 'baseline'
type UIBoxAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
type UIBoxContent = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'baseline' | 'stretch'
type UIBoxSelf = 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
type UIBoxFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'
type UIBoxOverflow = 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll'
type UIBoxBorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none'
