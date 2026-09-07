import { computed, type MaybeRefOrGetter, watch } from 'vue'
import { createBranch, provideBranch, useBranch } from './useBranchContext.ts'
import { useNavigationContext } from './useNavigationContext.ts'

export interface NavigationItemOptions {
  index: MaybeRefOrGetter<number>
  disabled?: MaybeRefOrGetter<boolean>
}

export function useNavigationItem(options: NavigationItemOptions) {
  const context = useNavigationContext()

  const parentBranch = useBranch()
  const branch = createBranch(parentBranch, options.index, options.disabled)

  provideBranch(branch)

  watch(
    () => branch.disabled,
    (disabled, _, onCleanup) => {
      if (disabled) return
      context.register(branch.key)
      onCleanup(() => context.unregister(branch.key))
    },
    { immediate: true },
  )

  return {
    context,
    branch,
    isFocused: computed(() => context.focusedKey.value === branch.key),
  }
}