import { type MaybeRefOrGetter, watch } from 'vue'
import { navigationContext } from '../context/navigation.ts'
import { branchContext, createChildBranch } from '../context/branch.ts'

export interface NavigationItemOptions {
  index: MaybeRefOrGetter<number>
  disabled?: MaybeRefOrGetter<boolean>
}

export function useNavigationItem(options: NavigationItemOptions) {
  const navigation = navigationContext.getOrCreate({ tree: [], childrenKey: undefined })
  const parentBranch = branchContext.getOrCreate()

  const branch = createChildBranch(parentBranch, options.index, options.disabled)

  /* prettier-ignore */
  watch(() => branch.disabled, (disabled, _, onCleanup) => {
    if (disabled) return
    navigation.register(branch.key)
    onCleanup(() => navigation.unregister(branch.key))
  }, { immediate: true })

  branchContext.provide(branch)

  return {
    navigation,
    branch,
  }
}
