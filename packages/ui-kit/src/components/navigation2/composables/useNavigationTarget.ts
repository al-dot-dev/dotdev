import { onBeforeUnmount, onMounted, type MaybeRefOrGetter, type Ref, watch, type WatchSource } from 'vue'
import type { PathKey } from '../core/types.ts'
import { useKeyboardNavigation } from './useKeyboardNavigation.ts'

interface NavigationTargetOptions {
  element?: Ref<HTMLElement | null>
  focusedIndex: Ref<number>
  items: MaybeRefOrGetter<PathKey[]>
  isFocused: WatchSource<boolean>
  wrap?: MaybeRefOrGetter<boolean>
  enabled?: MaybeRefOrGetter<boolean>
}

export function useNavigationTarget(options: NavigationTargetOptions) {
  const { onKeydown } = useKeyboardNavigation<PathKey>({
    focusedIndex: options.focusedIndex,
    items: options.items,
    wrap: options.wrap,
    enabled: options.enabled,
  })

  onMounted(() => {
    const el = options.element?.value
    if (!el) return

    watch(options.isFocused, (focused) => focused && el.focus(), { immediate: true })

    el.addEventListener('keydown', onKeydown)

    onBeforeUnmount(() => {
      el.removeEventListener('keydown', onKeydown)
    })
  })

  return { onKeydown }
}