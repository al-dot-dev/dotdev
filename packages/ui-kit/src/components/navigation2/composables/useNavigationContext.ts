import { computed, type ComputedRef, type MaybeRefOrGetter, ref, shallowReactive, toValue, type Ref } from 'vue'
import type { PathKey } from '../core/types.ts'
import { getParentKey } from '../core/path.ts'
import { flattenTree } from '../core/tree.ts'
import { createContext } from '../core/create-context.ts'

export interface NavigationContext {
  pathKeys: ComputedRef<PathKey[]>
  focusedIndex: Ref<number>
  focusedKey: ComputedRef<PathKey | null>
  activeBranchKey: ComputedRef<PathKey | null>
  register: (key: PathKey) => void
  unregister: (key: PathKey) => void
  focus: (key: PathKey | null) => void
}

export interface NavigationContextOptions<T = unknown> {
  tree: MaybeRefOrGetter<T[]>
  childrenKey?: MaybeRefOrGetter<keyof T | undefined>
}

export const [useNavigationContext, provideNavigationContext] = createContext<NavigationContext, [NavigationContextOptions<unknown>]>((options) => {
  const allPathKeys = computed(() => flattenTree(toValue(options.tree), toValue(options.childrenKey) as any))
  const registry = shallowReactive(new Set<PathKey>())

  const pathKeys = computed(() => {
    const keys: PathKey[] = []
    for (const key of allPathKeys.value.keys()) {
      if (registry.has(key)) keys.push(key)
    }
    return keys
  })

  const focusedIndex = ref(-1)
  const focusedKey = computed(() => pathKeys.value[focusedIndex.value] ?? null)
  const activeBranchKey = computed(() => (focusedKey.value ? getParentKey(focusedKey.value) : null))

  function register(key: PathKey) { registry.add(key) }
  function unregister(key: PathKey) { registry.delete(key) }

  function focus(key: PathKey | null) {
    if (key === null) { focusedIndex.value = -1; return }
    const i = pathKeys.value.indexOf(key)
    if (i !== -1) focusedIndex.value = i
  }

  return { pathKeys, focusedIndex, focusedKey, activeBranchKey, register, unregister, focus }
})