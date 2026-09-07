import { computed, type MaybeRefOrGetter, reactive, toValue } from 'vue'
import { createContext } from '../core/context.ts'
import type { NavigationPath, NavigationPathKey } from '../core/types.ts'
import { toPathKey } from '../core/utils.ts'

interface NavigationBranch {
  readonly key: NavigationPathKey
  readonly path: NavigationPath
  readonly disabled: boolean
}

function createNextBranch(parent: NavigationBranch, disabled?: MaybeRefOrGetter<boolean>): NavigationBranch {
  return reactive({
    key: parent.key,
    path: parent.path,
    disabled: computed(() => parent.disabled || toValue(disabled) || false),
  })
}

function createChildBranch(
  parent: NavigationBranch,
  index: MaybeRefOrGetter<number>,
  disabled?: MaybeRefOrGetter<boolean>,
): NavigationBranch {
  const value = toValue(index)
  const path = [...parent.path, value]

  return reactive({
    key: toPathKey(path),
    path,
    disabled: computed(() => parent.disabled || toValue(disabled) || false),
  })
}

const branchContext = createContext((): NavigationBranch => ({
  key: '',
  path: [],
  disabled: false,
}))

export { branchContext, createNextBranch, createChildBranch }
