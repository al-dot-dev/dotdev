import type { Path, PathKey } from './types.ts'

export function toPathKey(path: Path): PathKey {
  return path.join('.')
}

export function getParentKey(key: PathKey): PathKey {
  const i = key.lastIndexOf('.')
  return i === -1 ? '' : key.slice(0, i)
}
