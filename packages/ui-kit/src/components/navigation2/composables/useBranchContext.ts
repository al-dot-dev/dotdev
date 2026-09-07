import { computed, type MaybeRefOrGetter, reactive, toValue } from 'vue'
import type { Path, PathKey } from '../core/types.ts'
import { toPathKey } from '../core/path.ts'
import { createContext } from '../core/create-context.ts'

export interface Branch {
  readonly key: PathKey
  readonly path: Path
  readonly disabled: boolean
}

export const ROOT_BRANCH: Branch = Object.freeze({ key: '', path: [], disabled: false })

export function createBranch(
  parent: Branch,
  index?: MaybeRefOrGetter<number>,
  disabled?: MaybeRefOrGetter<boolean>,
): Branch {
  const child = index !== undefined

  return reactive({
    key: child ? toPathKey([...parent.path, toValue(index)]) : parent.key,
    path: child ? [...parent.path, toValue(index)] : parent.path,
    disabled: computed(() => parent.disabled || toValue(disabled) || false),
  })
}

export const [useBranch, provideBranch] = createContext<Branch, []>(() => ROOT_BRANCH)
