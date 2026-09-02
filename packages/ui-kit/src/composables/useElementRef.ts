import { ref, type Ref, type VNode } from 'vue'

export type ElementRef<T extends HTMLElement> = Ref<T | undefined>

export function useElementRef<T extends HTMLElement>() {
  const element = ref<T>()

  const bind = {
    onVnodeMounted: (vnode: VNode) => (element.value = (vnode.el as T) || undefined),
    onVnodeUnmounted: () => (element.value = undefined),
  }

  return { element, bind }
}
