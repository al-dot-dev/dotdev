import type { PublicProps } from 'vue'

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
export type UIDefineComponentProps<Props, Emits extends object = {}> =
  Props & UIEmitsToProps<Emits> & UIModelFromEmits<Emits> & PublicProps

export type UIDefineComponentCtx<Slots = {}, Exposed = {}> = {
  attrs: Record<string, unknown>
  expose(exposed: Exposed): void
  slots: Readonly<Slots> & Slots
}

export type UIDefineComponentExpose = {
  expose(exposed: Record<string, unknown>): void
}

export type UIDefineComponentSetup<Props, Slots = {}, Emits extends object = {}, Exposed = {}> =
  UIDefineComponentCtx<Slots, Exposed> & { props: UIDefineComponentProps<Props, Emits> }

type UIEmitsToProps<Emits extends object> = {
  [K in keyof Emits as K extends string ? `on${Capitalize<K>}` : never]?: Emits[K] extends readonly any[]
    ? (...args: Emits[K]) => void
    : Emits[K]
}

type UIEmitPayload<Emits extends object, K extends keyof Emits> =
  Emits[K] extends readonly [infer Value, ...any[]] ? Value : unknown

type UIModelFromEmits<Emits extends object> = {
  [K in keyof Emits as K extends `update:${infer Model}` ? Model : never]?: UIEmitPayload<Emits, K>
}