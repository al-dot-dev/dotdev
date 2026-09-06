import { computed, type MaybeRefOrGetter, reactive, toValue } from 'vue'
import type { NavigationPath, NavigationPathKey } from './types.ts'
import { createContext } from './create-context.ts'
import { getPathKey } from './utils.ts'

export function createNextBranch(parent: NavigationBranch, disabled?: MaybeRefOrGetter<boolean>): NavigationBranch {
  return reactive({
    key: parent.key,
    path: parent.path,
    disabled: computed(() => parent.disabled || toValue(disabled) || false),
  })
}

export function createChildBranch(
  parent: NavigationBranch,
  index: MaybeRefOrGetter<number>,
  disabled?: MaybeRefOrGetter<boolean>,
): NavigationBranch {
  const value = toValue(index)
  const path = [...parent.path, value]
  return reactive({
    key: getPathKey(path),
    path,
    disabled: computed(() => parent.disabled || toValue(disabled) || false),
  })
}

interface NavigationBranch {
  readonly key: NavigationPathKey
  readonly path: NavigationPath
  readonly disabled: boolean
}

const [useNavigationBranch, provideNavigationBranch] = createContext<NavigationBranch, []>(() => ({
  key: '',
  path: [],
  disabled: false,
}))

export { useNavigationBranch, provideNavigationBranch }
