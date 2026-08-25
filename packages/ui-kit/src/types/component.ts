import type { PublicProps, VNode } from 'vue'

/**
 * Hand-writable component declarations, a clean alternative to the generated
 * `__VLS_` types. Generic arguments are declared on the wrapping function
 * signature and inferred by vue-tsc in templates.
 *
 * @example
 * declare const ListBox: <
 *   T,
 *   L extends keyof T,
 *   V extends keyof T,
 *   M extends boolean,
 * >(
 *   props: UIDefineComponentProps<
 *     UIListBoxProps<T, L, V, M>,
 *     { 'update:modelValue': [value: M extends true ? T[] : T | undefined] },
 *   >,
 *   ctx?: UIDefineComponentCtx<UIListBoxSlots<T>>,
 *   expose?: UIDefineComponentExpose,
 *   setup?: Promise<
 *     UIDefineComponentSetup<
 *       UIListBoxProps<T, L, V, M>,
 *       UIListBoxSlots<T>,
 *       { 'update:modelValue': [value: M extends true ? T[] : T | undefined] },
 *     >
 *   >,
 * ) => VNode & { __ctx?: NonNullable<Awaited<typeof setup>> }
 */
export type DefineComponentProps<Props, Emits extends object = {}> = Props &
  EmitsToProps<Emits> &
  ModelFromEmits<Emits> &
  PublicProps

export type DefineComponentReturn<S> = VNode & { __ctx?: NonNullable<Awaited<S>> }

export type DefineComponentCtx<Slots = {}, Exposed = {}> = {
  attrs: Record<string, unknown>
  expose(exposed: Exposed): void
  slots: Readonly<Slots> & Slots
}

export type DefineComponentExpose = {
  expose(exposed: Record<string, unknown>): void
}

export type DefineComponentSetup<Props, Slots = {}, Emits extends object = {}, Exposed = {}> = DefineComponentCtx<
  Slots,
  Exposed
> & { props: DefineComponentProps<Props, Emits> }

type EmitsToProps<Emits extends object> = {
  [K in keyof Emits as K extends string ? `on${Capitalize<K>}` : never]?: Emits[K] extends readonly any[]
    ? (...args: Emits[K]) => void
    : Emits[K]
}

type EmitPayload<Emits extends object, K extends keyof Emits> = Emits[K] extends readonly [infer Value, ...any[]]
  ? Value
  : unknown

type ModelFromEmits<Emits extends object> = {
  [K in keyof Emits as K extends `update:${infer Model}` ? Model : never]?: EmitPayload<Emits, K>
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * Converts an emits options object to a callable $emit signature.
 * Handles Vue 3.3+ tuple format: { click: [event: MouseEvent] }
 */
export type EmitFn<Options = {}> = {} extends Options
  ? (e: string, ...args: any[]) => void
  : UnionToIntersection<
      {
        [key in keyof Options]: Options[key] extends [...args: infer Args]
          ? (e: key, ...args: Args) => void
          : (e: key, ...args: any[]) => void
      }[keyof Options]
    >

/**
 * WebStorm-compatible component type.
 * Maps Props/Slots/Emits to $props/$slots/$emit so the IDE shows
 * slot and emit autocompletion in templates (PrimeVue pattern).
 */
export type DefineComponent<P = {}, S = {}, E = EmitFn, M = {}> = {
  new (): {
    $props: P
    $slots: S
    $emit: E
  } & M
}
