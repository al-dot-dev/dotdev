import { type MaybeRefOrGetter, watch } from 'vue'
import { provideNavigationContext, useNavigationContext } from './navigation-context.ts'
import {
  createChildBranch,
  createNextBranch,
  provideNavigationBranch,
  useNavigationBranch,
} from './navigation-branch-context.ts'

export interface NavigationContextOptions<T = unknown> {
  tree: MaybeRefOrGetter<T[]>
  childrenKey: MaybeRefOrGetter<keyof T | undefined>
  disabled?: MaybeRefOrGetter<boolean>
}

export function useNavigation<T>(options: NavigationContextOptions<T>) {
  const navigation = useNavigationContext({ tree: options.tree, childrenKey: options.childrenKey as any })
  const parentBranch = useNavigationBranch()
  const isRoot = parentBranch.path.length === 0

  const branch = createNextBranch(parentBranch, options.disabled)

  provideNavigationBranch(branch)
  if (isRoot) provideNavigationContext(navigation)

  return {
    navigation,
    branch,
    isRoot,
  }
}

export interface NavigationItemOptions {
  index: MaybeRefOrGetter<number>
  disabled?: MaybeRefOrGetter<boolean>
}

export function useNavigationItem(options: NavigationItemOptions) {
  const navigation = useNavigationContext()
  const parentBranch = useNavigationBranch()

  const branch = createChildBranch(parentBranch, options.index, options.disabled)

  /* prettier-ignore */
  watch(() => branch.disabled, (disabled, _, onCleanup) => {
    if (disabled) return
    navigation.register(branch.key)
    onCleanup(() => navigation.unregister(branch.key))
  }, { immediate: true })

  provideNavigationBranch(branch)

  return {
    navigation,
    branch,
  }
}
