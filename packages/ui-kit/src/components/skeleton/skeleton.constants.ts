import type { InjectionKey } from 'vue'

export const SKELETON_PROVIDE_KEY: InjectionKey<() => boolean> = Symbol('skeleton-provider')
