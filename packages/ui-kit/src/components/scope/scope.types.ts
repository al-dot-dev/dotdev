import type { DefineComponent, UITagElement } from '@dotdev/ui-kit'

export interface UIScopeProps<T extends Record<string, unknown> = Record<string, unknown>> {
  is?: UITagElement
  scope: T
}

export interface UIScopeSlots<T = Record<string, unknown>> {
  default?(props: T): void
}

declare const Scope: DefineComponent<UIScopeProps>
