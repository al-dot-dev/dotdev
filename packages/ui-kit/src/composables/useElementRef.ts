import { ref, type Ref, type VNode } from 'vue'

export type ElementRef<T extends HTMLElement = HTMLElement> = Ref<T | null>

export function useElementRef<T extends HTMLElement = HTMLElement>(): ElementRef<T> {
  const state = ref<T | null>(null)

  const callback = {
    onVnodeMounted: (vnode: VNode) => (state.value = vnode.el),
    onVnodeUnmounted: () => (state.value = null),
  } as unknown as ElementRef<T>

  Object.defineProperty(callback, 'value', {
    get: () => state.value,
  })

  return callback
}
