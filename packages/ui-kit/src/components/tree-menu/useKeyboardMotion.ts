import { computed, type ComputedRef, type MaybeRefOrGetter, ref, type Ref, toValue } from 'vue'

export interface KeyboardNavigationNode<T> {
  item: T
  index: number
  depth: number
  parentIndex: number
  hasChildren: boolean
  endIndex: number
}

export interface KeyboardNavigationContext<T> {
  event: KeyboardEvent
  activeIndex: number
  activeNode: KeyboardNavigationNode<T> | null
  nodes: KeyboardNavigationNode<T>[]
  navigableIndexes: number[]

  isNavigable: (index: number) => boolean
  setActiveIndex: (index: number) => boolean

  focusNext: () => boolean
  focusPrev: () => boolean
  focusFirst: () => boolean
  focusLast: () => boolean

  openOrFocusChild: () => boolean
  closeOrFocusParent: () => boolean
}

export interface KeyboardNavigationOptions<T> {
  items: MaybeRefOrGetter<T[]>
  childrenKey?: MaybeRefOrGetter<keyof T | undefined>
  initialIndex?: MaybeRefOrGetter<number>
  wrap?: MaybeRefOrGetter<boolean>
  isExpanded?: (item: T) => boolean
  isDisabled?: (item: T) => boolean
  onKeydown?: (context: KeyboardNavigationContext<T>) => boolean | void
  onExpand?: (item: T) => void
  onCollapse?: (item: T) => void
}

export interface KeyboardNavigationReturn<T> {
  nodes: ComputedRef<KeyboardNavigationNode<T>[]>
  navigableIndexes: ComputedRef<number[]>
  activeIndex: Ref<number>
  activeNode: ComputedRef<KeyboardNavigationNode<T> | null>
  activeItem: ComputedRef<T | undefined>
  isNavigable: (index: number) => boolean
  setActiveIndex: (index: number) => boolean
  focusNext: () => boolean
  focusPrev: () => boolean
  focusFirst: () => boolean
  focusLast: () => boolean
  openOrFocusChild: () => boolean
  closeOrFocusParent: () => boolean
  handleKeydown: (event: KeyboardEvent) => boolean
}

export function useKeyboardNavigation<T>(options: KeyboardNavigationOptions<T>): KeyboardNavigationReturn<T> {
  const childrenKey = computed(() => toValue(options.childrenKey))
  const wrap = computed(() => toValue(options.wrap ?? false))

  function getChildren(item: T): T[] {
    const key = childrenKey.value
    if (!key || item == null) return []

    const children = item[key]
    return Array.isArray(children) ? (children as T[]) : []
  }

  const nodes = computed(() => {
    const rawItems = toValue(options.items) ?? []
    const items = Array.isArray(rawItems) ? (rawItems as T[]) : []
    return flattenStructure(items, getChildren)
  })

  const activeIndex = ref(toValue(options.initialIndex ?? -1))
  const navigableIndexes = computed(() => collectNavigableIndexes(nodes.value, options.isDisabled, options.isExpanded))
  const activeNode = computed(() => nodes.value[activeIndex.value] ?? null)
  const activeItem = computed(() => activeNode.value?.item)

  function isNavigable(index: number): boolean {
    if (index < 0 || index >= nodes.value.length) {
      return false
    }

    const indexes = navigableIndexes.value
    const position = lowerBound(indexes, index)

    return indexes[position] === index
  }

  function setActiveIndex(index: number): boolean {
    if (!isNavigable(index)) {
      return false
    }

    activeIndex.value = index
    return true
  }

  function focusFirst(): boolean {
    const first = navigableIndexes.value[0]

    if (first === undefined) {
      return false
    }

    activeIndex.value = first
    return true
  }

  function focusLast(): boolean {
    const indexes = navigableIndexes.value
    const last = indexes[indexes.length - 1]

    if (last === undefined) {
      return false
    }

    activeIndex.value = last
    return true
  }

  function focusNext(): boolean {
    const indexes = navigableIndexes.value

    if (indexes.length === 0) {
      return false
    }

    if (setActiveIndex(activeIndex.value + 1)) {
      return true
    }

    const position = lowerBound(indexes, activeIndex.value + 1)
    const next = indexes[position]

    if (next !== undefined) {
      activeIndex.value = next
      return true
    }

    if (!wrap.value) {
      return false
    }

    return focusFirst()
  }

  function focusPrev(): boolean {
    const indexes = navigableIndexes.value

    if (indexes.length === 0) {
      return false
    }

    if (setActiveIndex(activeIndex.value - 1)) {
      return true
    }

    const position = lowerBound(indexes, activeIndex.value) - 1
    const prev = indexes[position]

    if (prev !== undefined) {
      activeIndex.value = prev
      return true
    }

    if (!wrap.value) {
      return false
    }

    return focusLast()
  }

  function openOrFocusChild(): boolean {
    const node = activeNode.value

    if (!node?.hasChildren) {
      return false
    }

    const expanded = options.isExpanded ? Boolean(options.isExpanded(node.item)) : true

    if (!expanded) {
      options.onExpand?.(node.item)
      return true
    }

    const indexes = navigableIndexes.value
    const position = lowerBound(indexes, node.index + 1)
    const candidate = indexes[position]

    if (candidate !== undefined && candidate <= node.endIndex) {
      activeIndex.value = candidate
      return true
    }

    return false
  }

  function closeOrFocusParent(): boolean {
    const node = activeNode.value

    if (!node) {
      return false
    }

    const expanded = options.isExpanded ? Boolean(options.isExpanded(node.item)) : true

    if (options.isExpanded && node.hasChildren && expanded) {
      options.onCollapse?.(node.item)
      return true
    }

    let parentIndex = node.parentIndex

    while (parentIndex !== -1) {
      if (setActiveIndex(parentIndex)) {
        return true
      }

      parentIndex = nodes.value[parentIndex]?.parentIndex ?? -1
    }

    return false
  }

  function createContext(event: KeyboardEvent): KeyboardNavigationContext<T> {
    return {
      event,
      activeIndex: activeIndex.value,
      activeNode: activeNode.value,
      nodes: nodes.value,
      navigableIndexes: navigableIndexes.value,

      isNavigable,
      setActiveIndex,

      focusNext,
      focusPrev,
      focusFirst,
      focusLast,

      openOrFocusChild,
      closeOrFocusParent,
    }
  }

  const keyActions: Partial<Record<string, () => boolean>> = {
    ArrowDown: focusNext,
    ArrowUp: focusPrev,
    ArrowRight: openOrFocusChild,
    ArrowLeft: closeOrFocusParent,
    Home: focusFirst,
    End: focusLast,
  }

  function handleKeydown(event: KeyboardEvent): boolean {
    if (event.defaultPrevented || event.isComposing) {
      return false
    }

    if (options.onKeydown?.(createContext(event)) === true) {
      event.preventDefault()
      event.stopPropagation()
      return true
    }

    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
      return false
    }

    const action = keyActions[event.key]

    if (!action) {
      return false
    }

    const handled = action()

    if (handled) {
      event.preventDefault()
      event.stopPropagation()
    }

    return handled
  }

  return {
    nodes,
    navigableIndexes,

    activeIndex,
    activeNode,
    activeItem,

    isNavigable,
    setActiveIndex,

    focusNext,
    focusPrev,
    focusFirst,
    focusLast,

    openOrFocusChild,
    closeOrFocusParent,

    handleKeydown,
  }
}

function flattenStructure<T>(items: T[], getChildren: (item: T) => T[]): KeyboardNavigationNode<T>[] {
  const nodes: KeyboardNavigationNode<T>[] = []

  function walk(list: T[], depth: number, parentIndex: number) {
    for (const item of list) {
      const index = nodes.length
      const children = getChildren(item)
      const hasChildren = children.length > 0

      const node: KeyboardNavigationNode<T> = {
        item,
        index,
        depth,
        parentIndex,
        hasChildren,
        endIndex: index,
      }

      nodes.push(node)

      if (hasChildren) {
        walk(children, depth + 1, index)
        node.endIndex = nodes.length - 1
      }
    }
  }

  walk(items, 0, -1)

  return nodes
}

function collectNavigableIndexes<T>(
  nodes: KeyboardNavigationNode<T>[],
  isDisabled?: (item: T) => boolean,
  isExpanded?: (item: T) => boolean,
): number[] {
  const result: number[] = []

  function walk(start: number, end: number) {
    let i = start

    while (i <= end) {
      const node = nodes[i]

      if (isDisabled?.(node.item)) {
        i = node.endIndex + 1
        continue
      }

      result.push(i)

      if (node.hasChildren) {
        const expanded = isExpanded ? Boolean(isExpanded(node.item)) : true

        if (expanded) {
          walk(i + 1, node.endIndex)
        }

        i = node.endIndex + 1
      } else {
        i += 1
      }
    }
  }

  walk(0, nodes.length - 1)

  return result
}

function lowerBound(values: number[], target: number): number {
  let left = 0
  let right = values.length

  while (left < right) {
    const mid = (left + right) >> 1

    if (values[mid] < target) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left
}
