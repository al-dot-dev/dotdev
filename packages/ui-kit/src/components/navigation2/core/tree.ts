import type { Path, PathKey } from './types.ts'
import { toPathKey } from './path.ts'

export function flattenTree<T>(items: T[], childrenKey?: PropertyKey): Map<PathKey, T> {
  const result = new Map<PathKey, T>()

  function walk(list: readonly T[], parentPath: Path) {
    list.forEach((item, i) => {
      const path = [...parentPath, i]
      result.set(toPathKey(path), item)

      if (childrenKey && typeof item === 'object' && item !== null && childrenKey in item) {
        const children = (item as Record<PropertyKey, unknown>)[childrenKey]
        if (Array.isArray(children)) walk(children, path)
      }
    })
  }

  walk(items, [])
  return result
}
