import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue'

export interface KeyboardNavigationOptions<T = unknown> {
  items: MaybeRefOrGetter<T[]>
  focusedIndex: Ref<number>
  wrap?: MaybeRefOrGetter<boolean>
  enabled?: MaybeRefOrGetter<boolean>
  isDisabled?: (item: T) => boolean
  onKeydown?: (ctx: NavigationEvent<T>) => void | true
  onReachTop?: (ctx: NavigationEvent<T>) => void | true
  onReachBottom?: (ctx: NavigationEvent<T>) => void | true
  onReachLeft?: (ctx: NavigationEvent<T>) => void | true
  onReachRight?: (ctx: NavigationEvent<T>) => void | true
}

export interface NavigationEvent<T = unknown> {
  event: KeyboardEvent
  item?: T
  index: number
}

type Direction = 1 | -1

export function useKeyboardNavigation<T>(options: KeyboardNavigationOptions<T>) {
  const { focusedIndex } = options

  const items = () => toValue(options.items) ?? []
  const enabled = computed(() => toValue(options.enabled) ?? true)
  const wrap = computed(() => toValue(options.wrap) ?? false)

  function isNavigable(index: number): boolean {
    const list = items()
    if (index < 0 || index >= list.length) return false
    const item = list[index]
    return item !== undefined && !options.isDisabled?.(item)
  }

  function findNavigable(from: number, direction: Direction): number {
    let i = from
    while (i >= 0 && i < items().length) {
      if (isNavigable(i)) return i
      i += direction
    }
    return -1
  }

  function clampIndex(index: number, direction: Direction): number {
    const length = items().length
    if (length === 0) return -1
    if (index < 0) return direction === 1 ? 0 : length - 1
    if (index >= length) return direction === 1 ? length - 1 : 0
    return index
  }

  function moveBy(direction: Direction, onReach?: () => boolean): boolean {
    const next = focusedIndex.value + direction

    if (isNavigable(next)) {
      focusedIndex.value = next
      return true
    }

    const found = findNavigable(next, direction)
    if (found !== -1) {
      focusedIndex.value = found
      return true
    }

    if (wrap.value) {
      const start = direction === 1 ? 0 : items().length - 1
      const wrapped = findNavigable(start, direction)
      if (wrapped !== -1 && wrapped !== focusedIndex.value) {
        focusedIndex.value = wrapped
        return true
      }
    }

    return onReach?.() ?? false
  }

  function focusFirst(event?: KeyboardEvent): boolean {
    const i = findNavigable(0, 1)
    if (i === -1) return reach(event, options.onReachTop)
    focusedIndex.value = i
    return true
  }

  function focusLast(event?: KeyboardEvent): boolean {
    const i = findNavigable(items().length - 1, -1)
    if (i === -1) return reach(event, options.onReachBottom)
    focusedIndex.value = i
    return true
  }

  function reach(event?: KeyboardEvent, cb?: (ctx: NavigationEvent<T>) => void | true): boolean {
    if (!event || !cb) return false
    return cb(getContext(event)) ?? false
  }

  function getContext(event: KeyboardEvent): NavigationEvent<T> {
    return {
      event,
      item: items()[focusedIndex.value],
      index: focusedIndex.value,
    }
  }

  function canHandle(event: KeyboardEvent): boolean {
    if (!enabled.value) return false
    if (event.defaultPrevented || event.isComposing) return false
    return !(event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
  }

  const actions: Record<string, (e: KeyboardEvent) => boolean> = {
    ArrowDown: (e) => moveBy(1, () => reach(e, options.onReachBottom)),
    ArrowUp: (e) => moveBy(-1, () => reach(e, options.onReachTop)),
    ArrowRight: (e) => moveBy(1, () => reach(e, options.onReachRight)),
    ArrowLeft: (e) => moveBy(-1, () => reach(e, options.onReachLeft)),
    Home: (e) => focusFirst(e),
    End: (e) => focusLast(e),
  }

  function onKeydown(event: KeyboardEvent): boolean {
    if (options.onKeydown?.(getContext(event))) {
      event.preventDefault()
      event.stopPropagation()
      return true
    }

    if (!canHandle(event) || !(event.key in actions)) return false

    const handled = actions[event.key](event)
    if (!handled) return false

    event.preventDefault()
    event.stopPropagation()
    return true
  }

  function focus(index?: number, direction: Direction = 1): boolean {
    const start = index === undefined ? focusedIndex.value : clampIndex(index, direction)
    if (start === -1) return false

    const found = findNavigable(start, direction)
    if (found === -1) return false

    focusedIndex.value = found
    return true
  }

  function blur(): void {
    focusedIndex.value = -1
  }

  return { focusedIndex, onKeydown, focus, blur, focusFirst, focusLast }
}