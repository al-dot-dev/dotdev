import { computed, type MaybeRefOrGetter, type Ref, ref, toValue } from 'vue'

export interface NavigationOptions<T = unknown> {
  items: MaybeRefOrGetter<T[]>
  wrap?: MaybeRefOrGetter<boolean>
  enabled?: MaybeRefOrGetter<boolean>
  initialIndex?: MaybeRefOrGetter<number>
  focusedIndex?: Ref<number>
  isDisabled?: (item: T) => boolean

  onKeydown?: NavigationHandler<T>

  onReachTop?: NavigationHandler<T>
  onReachBottom?: NavigationHandler<T>
  onReachLeft?: NavigationHandler<T>
  onReachRight?: NavigationHandler<T>
}

export type NavigationHandler<T> = (context: NavigationContext<T>) => void | true

export interface NavigationContext<T = unknown> {
  event: KeyboardEvent
  item?: T
  index: number
}

type NavigationKey = 'ArrowDown' | 'ArrowUp' | 'ArrowRight' | 'ArrowLeft' | 'Home' | 'End'

type NavigationAction = (event: KeyboardEvent) => boolean
type NavigationDirection = 1 | -1

export function useKeyboardNavigation<T>(options: NavigationOptions<T>) {
  const focusedIndex = options.focusedIndex ?? ref(toValue(options.initialIndex) ?? -1)

  const items = computed(() => toValue(options.items) ?? [])
  const itemsLength = computed(() => items.value.length)
  const enabled = computed(() => toValue(options.enabled) ?? true)
  const wrap = computed(() => toValue(options.wrap) ?? false)

  function blur() {
    focusedIndex.value = -1
    return true
  }

  function getStartIndex(index: number | undefined, direction: NavigationDirection = 1) {
    if (itemsLength.value === 0) {
      return -1
    }

    index = index ?? focusedIndex.value

    if (index < 0) {
      return direction === 1 ? 0 : itemsLength.value - 1
    }

    if (index >= itemsLength.value) {
      return direction === 1 ? itemsLength.value - 1 : 0
    }

    return index
  }

  function focus(index?: number, direction: NavigationDirection = 1) {
    const startIndex = getStartIndex(index, direction)
    const nextIndex = findNavigableIndex(startIndex, direction)

    if (nextIndex === -1) {
      return false
    }

    focusedIndex.value = nextIndex
    return true
  }

  function isNavigable(index: number): boolean {
    if (index < 0 || index >= itemsLength.value) {
      return false
    }

    const item = items.value[index]

    return item !== undefined && !options.isDisabled?.(item)
  }

  function findNavigableIndex(startIndex: number, direction: NavigationDirection): number {
    let index = startIndex

    while (index >= 0 && index < itemsLength.value) {
      if (isNavigable(index)) {
        return index
      }

      index += direction
    }

    return -1
  }

  function setFocusedIndex(index: number): boolean {
    if (!isNavigable(index)) {
      return false
    }

    focusedIndex.value = index

    return true
  }

  function getContext(event: KeyboardEvent): NavigationContext<T> {
    const index = focusedIndex.value

    return {
      event,
      item: items.value[index],
      index,
    }
  }

  function reach(event?: KeyboardEvent, callback?: NavigationHandler<T>): boolean {
    if (!event) return false
    return callback?.(getContext(event)) ?? false
  }

  function focusNext(direction: NavigationDirection = 1, onReach?: () => boolean): boolean {
    if (setFocusedIndex(focusedIndex.value + direction)) {
      return true
    }

    const nextIndex = findNavigableIndex(focusedIndex.value + direction, direction)

    if (nextIndex !== -1) {
      focusedIndex.value = nextIndex
      return true
    }

    if (wrap.value) {
      const startIndex = direction === 1 ? 0 : itemsLength.value - 1

      const wrappedIndex = findNavigableIndex(startIndex, direction)

      if (wrappedIndex !== -1 && wrappedIndex !== focusedIndex.value) {
        focusedIndex.value = wrappedIndex
        return true
      }
    }

    return onReach?.() ?? false
  }

  function focusDown(event?: KeyboardEvent): boolean {
    return focusNext(1, () => reach(event, options.onReachBottom))
  }

  function focusUp(event?: KeyboardEvent): boolean {
    return focusNext(-1, () => reach(event, options.onReachTop))
  }

  function focusRight(event?: KeyboardEvent): boolean {
    return focusNext(1, () => reach(event, options.onReachRight))
  }

  function focusLeft(event: KeyboardEvent): boolean {
    return focusNext(-1, () => reach(event, options.onReachLeft))
  }

  function focusFirst(event?: KeyboardEvent): boolean {
    const index = findNavigableIndex(0, 1)

    if (index === -1) {
      return reach(event, options.onReachTop)
    }

    return setFocusedIndex(index)
  }

  function focusLast(event?: KeyboardEvent): boolean {
    const index = findNavigableIndex(itemsLength.value - 1, -1)

    if (index === -1) {
      return reach(event, options.onReachBottom)
    }

    return setFocusedIndex(index)
  }

  const keyActions: Record<NavigationKey, NavigationAction> = {
    ArrowDown: focusDown,
    ArrowUp: focusUp,
    ArrowRight: focusRight,
    ArrowLeft: focusLeft,
    Home: focusFirst,
    End: focusLast,
  }

  function canHandle(event: KeyboardEvent): boolean {
    if (!enabled.value) {
      return false
    }

    if (event.defaultPrevented || event.isComposing) {
      return false
    }

    return !(event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
  }

  function isNavigationKey(key: string): key is NavigationKey {
    return key in keyActions
  }

  function userKeydown(event: KeyboardEvent): boolean {
    if (!options.onKeydown) {
      return false
    }

    return options.onKeydown(getContext(event)) ?? false
  }

  function onKeydown(event: KeyboardEvent): boolean {
    if (userKeydown(event)) {
      event.preventDefault()
      event.stopPropagation()

      return true
    }

    if (!canHandle(event)) {
      return false
    }

    if (!isNavigationKey(event.key)) {
      return false
    }

    const handled = keyActions[event.key](event)

    if (!handled) {
      return false
    }

    event.preventDefault()
    event.stopPropagation()

    return true
  }

  return {
    focusedIndex,
    setFocusedIndex,
    focusFirst,
    focusLast,
    focusUp,
    focusDown,
    onKeydown,
    focus,
    blur,
  }
}
