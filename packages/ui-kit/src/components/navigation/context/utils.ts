import type { NavigationPath, NavigationPathKey } from './types.ts'

export function getPathKey(path: NavigationPath): NavigationPathKey {
  return path.join('.')
}

export function getParentKey(key: NavigationPathKey) {
  const index = key.lastIndexOf('.')
  return index === -1 ? '' : key.slice(0, index)
}
