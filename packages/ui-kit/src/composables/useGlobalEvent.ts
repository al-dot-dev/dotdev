import { onMounted, onUnmounted, type Ref, watch } from 'vue'

type GlobalEventOptions<T> = {
  target?: T
  watch?: Ref<boolean>
  immediate?: boolean
}

export function useGlobalEvent<E extends keyof DocumentEventMap>(
  event: E,
  handler: (event: DocumentEventMap[E]) => void,
  options?: GlobalEventOptions<Document>,
): void

export function useGlobalEvent<E extends keyof WindowEventMap>(
  event: E,
  handler: (event: WindowEventMap[E]) => void,
  options: GlobalEventOptions<Window>,
): void

export function useGlobalEvent<E extends keyof MediaQueryListEventMap>(
  event: E,
  handler: (event: MediaQueryListEventMap[E]) => void,
  options: GlobalEventOptions<MediaQueryList>,
): void

export function useGlobalEvent(event: string, handler: any, options?: GlobalEventOptions<any>) {
  const target = options?.target ?? document

  let cleanup: (() => void) | undefined

  const addListener = () => {
    if (cleanup) return

    target.addEventListener(event, handler)

    cleanup = () => {
      target.removeEventListener(event, handler)
      cleanup = undefined
    }
  }

  const removeListener = () => {
    cleanup?.()
  }

  if (options?.watch) {
    /* prettier-ignore */
    watch(options.watch, (enabled, _, onCleanup) => {
      setTimeout(() => enabled && addListener())
      onCleanup(removeListener)
    }, { immediate: options.immediate ?? false, flush: "post" })
  } else {
    onMounted(addListener)
    onUnmounted(removeListener)
  }
}
