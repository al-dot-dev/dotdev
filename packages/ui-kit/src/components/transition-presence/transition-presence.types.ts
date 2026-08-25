import type { DefineComponent, EmitFn } from '@dotdev/ui-kit'
import type { VNode } from 'vue'

export interface TransitionPresenceProps {
  show: boolean
  name: string
}

export interface TransitionPresenceSlots {
  default?(): VNode[]
}

export interface TransitionPresenceEmits {}

declare const TransitionPresence: DefineComponent<
  TransitionPresenceProps,
  TransitionPresenceSlots,
  EmitFn<TransitionPresenceEmits>
>
