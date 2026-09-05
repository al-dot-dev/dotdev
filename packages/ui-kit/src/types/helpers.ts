import type { Component } from 'vue'

export type HtmlLinkTarget = '_blank' | '_self' | '_parent' | '_top' | string
export type UITagElement = keyof HTMLElementTagNameMap | Component

export type PartialNested<T> = {
  [K in keyof T]?: T[K] extends object ? { [P in keyof T[K]]?: T[K][P] } : T[K]
}

export interface ElementEvents {
  onClick: MouseEvent
  onDblclick: MouseEvent

  onMousedown: MouseEvent
  onMouseup: MouseEvent
  onMousemove: MouseEvent
  onMouseenter: MouseEvent
  onMouseleave: MouseEvent
  onMouseover: MouseEvent
  onMouseout: MouseEvent

  onContextmenu: MouseEvent

  onFocus: FocusEvent
  onFocusin: FocusEvent
  onFocusout: FocusEvent
  onBlur: FocusEvent

  onKeydown: KeyboardEvent
  onKeyup: KeyboardEvent
  onKeypress: KeyboardEvent

  onDrag: DragEvent
  onDragstart: DragEvent
  onDragend: DragEvent
  onDragenter: DragEvent
  onDragleave: DragEvent
  onDragover: DragEvent
  onDrop: DragEvent

  onTouchstart: TouchEvent
  onTouchmove: TouchEvent
  onTouchend: TouchEvent
  onTouchcancel: TouchEvent

  onPointerdown: PointerEvent
  onPointermove: PointerEvent
  onPointerup: PointerEvent
  onPointercancel: PointerEvent
  onPointerenter: PointerEvent
  onPointerleave: PointerEvent
  onPointerover: PointerEvent
  onPointerout: PointerEvent
}

type LowercaseEventKeys<T> = {
  [K in keyof T as K extends `on${infer E}` ? Lowercase<E> : never]: T[K]
}

export type LowercaseElementEvents = LowercaseEventKeys<ElementEvents>
