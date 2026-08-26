import type { Component } from 'vue'

export type HtmlLinkTarget = '_blank' | '_self' | '_parent' | '_top' | string
export type UITagElement = keyof HTMLElementTagNameMap | Component

export type PartialNested<T> = {
  [K in keyof T]?: T[K] extends object ? { [P in keyof T[K]]?: T[K][P] } : T[K]
}
