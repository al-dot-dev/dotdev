import type {
  DefineComponent,
  EmitFn,
  LowercaseElementEvents,
  UiKitBaseProps,
  UIListProps,
  UIListSlotScope,
} from '@dotdev/ui-kit'
import type { VNode } from 'vue'

/* Props */
interface UIMenuProps2<T = unknown> extends UiKitBaseProps, UIListProps<T> {
  disabledItem?: (item: T) => boolean
  itemAttrs?: (item: T) => Record<string, unknown>
  disabled?: boolean
}

/* Slots */
interface UIMenuSlots2<T = unknown> {
  item?(scope: UIMenuSlotScope<T>): VNode[]
  label?(scope: UIMenuSlotScope<T>): VNode[]
  children?(scope: UIMenuSlotScope<T>): VNode[]
}

interface UIMenuSlotScope<T = unknown> extends UIListSlotScope<T> {
  disabled: boolean
  focused: boolean
}

/* Emits */
type UIMenuEmits2<T = unknown> = {
  'reach:top': []
  'reach:bottom': []
  'reach:left': []
  'reach:right': []
} & UIMenuItemEmits<T>

type UIMenuItemEmits<T = unknown> = /* @vue-ignore */ {
  [E in keyof LowercaseElementEvents as `item:${E}`]: [item: T, event: LowercaseElementEvents[E]]
}

/* Expose */
export interface UIMenuExpose2 {
  focusin: () => void
  focusout: () => void
  focus: (index?: number, direction?: 1 | -1) => void
  focusFirst: () => void
  focusLast: () => void
}

/* Component */
declare const Menu2: DefineComponent<UIMenuProps2, UIMenuSlots2, EmitFn<UIMenuEmits2>, UIMenuExpose2>

export type { UIMenuProps2, UIMenuSlots2, UIMenuSlotScope, UIMenuEmits2 }
