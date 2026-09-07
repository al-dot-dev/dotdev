import { type ComponentInternalInstance, computed, type MaybeRefOrGetter, ref, shallowReactive, toValue } from 'vue'
import type { NavigationPathKey } from '../core/types.ts'
import { createContext } from '../core/context.ts'
import { getParentKey, toPathKey } from '../core/utils.ts'

interface NavigationContextOptions<T> {
  tree: MaybeRefOrGetter<T[]>
  childrenKey: MaybeRefOrGetter<keyof T | undefined>
}

const navigationContext = createContext((options: NavigationContextOptions<any>) => {
  const hasFocus = ref(false)
  const index = ref(-1)
  const instances = new Map<NavigationPathKey, ComponentInternalInstance | null>()
  const registeredPaths = shallowReactive(new Set<NavigationPathKey>())

  const treePaths = computed(() => createPathMap(toValue(options.tree), toValue(options.childrenKey)))

  const paths = computed(() => [...treePaths.value.keys()].filter((path) => registeredPaths.has(path)))

  const focusedKey = computed(() => paths.value[index.value] ?? null)
  const parentKey = computed(() => (focusedKey.value ? getParentKey(focusedKey.value) : null))

  function register(path: NavigationPathKey) {
    registeredPaths.add(path)
  }

  function unregister(path: NavigationPathKey) {
    registeredPaths.delete(path)
  }

  function isRegistered(path: NavigationPathKey) {
    return registeredPaths.has(path)
  }

  function getItem(path?: NavigationPathKey) {
    if (!path) return undefined

    return treePaths.value.get(path)
  }

  function setFocus(path: NavigationPathKey | null) {
    if (path === null) {
      index.value = -1
      return
    }

    if (!isRegistered(path)) {
      return
    }

    index.value = paths.value.indexOf(path)
  }

  return {
    paths,
    index,
    focusedKey,
    parentKey,
    hasFocus,
    instances,
    register,
    unregister,
    isRegistered,
    getItem,
    setFocus,
  }
})

export { navigationContext }

function createPathMap<T>(items: readonly T[], childrenKey?: PropertyKey) {
  const paths = new Map<NavigationPathKey, T>()

  function walk(items: readonly T[], parentPath: readonly number[]) {
    items.forEach((item, index) => {
      const path = [...parentPath, index]
      const key = toPathKey(path)

      paths.set(key, item)

      if (childrenKey && typeof item === 'object' && item !== null && childrenKey in item) {
        const children = item[childrenKey as keyof T]

        if (Array.isArray(children)) {
          walk(children, path)
        }
      }
    })
  }

  walk(items, [])

  return paths
}
