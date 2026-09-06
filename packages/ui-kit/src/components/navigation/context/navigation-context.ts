import { computed, type MaybeRefOrGetter, ref, shallowReactive, toValue } from 'vue'
import type { NavigationPathKey } from './types.ts'
import { createContext } from './create-context.ts'
import { getParentKey, getPathKey } from './utils.ts'

interface NavigationContextOptions<T = unknown> {
  tree: MaybeRefOrGetter<T[]>
  childrenKey: MaybeRefOrGetter<keyof T | undefined>
}

const [useNavigationContext, provideNavigationContext] = createContext(<T>(options: NavigationContextOptions<T>) => {
  const allPaths = computed(() => flattenPaths(toValue(options.tree), toValue(options.childrenKey)))
  const registry = shallowReactive(new Set<NavigationPathKey>())

  const paths = computed(() => [...allPaths.value.keys()].filter((k) => registry.has(k)))

  function register(path: NavigationPathKey) {
    registry.add(path)
  }

  function unregister(path: NavigationPathKey) {
    registry.delete(path)
  }

  function has(path: NavigationPathKey) {
    return registry.has(path)
  }

  const currentKey = computed(() => paths.value[index.value] || null)
  const branchKey = computed(() => (currentKey.value ? getParentKey(currentKey.value) : null))

  const index = ref(-1)

  function focus(path: NavigationPathKey | null) {
    if (path === null) {
      index.value = -1
      return
    }

    if (!has(path)) {
      return
    }

    index.value = paths.value.indexOf(path)
  }

  return {
    paths,
    index,
    key: currentKey,
    branchKey,
    register,
    unregister,
    has,
    focus,
  }
})

export { useNavigationContext, provideNavigationContext }

function flattenPaths<T>(items: T[], childrenKey?: PropertyKey) {
  const paths = new Map<string, T>()

  function walk(items: readonly T[], parentPath: readonly number[]) {
    items.forEach((item, index) => {
      const path = [...parentPath, index]

      paths.set(getPathKey(path), item)

      if (childrenKey && typeof item === 'object' && item !== null && childrenKey in item) {
        const children = item[childrenKey as keyof T]
        if (Array.isArray(children)) walk(children, path)
      }
    })
  }

  walk(items, [])

  return paths
}
