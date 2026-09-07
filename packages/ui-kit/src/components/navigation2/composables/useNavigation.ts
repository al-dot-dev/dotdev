import { computed, type MaybeRefOrGetter } from 'vue'
import { createBranch, provideBranch, useBranch } from './useBranchContext.ts'
import {
  provideNavigationContext,
  useNavigationContext,
  type NavigationContextOptions,
} from './useNavigationContext.ts'

export interface NavigationOptions<T = unknown> extends NavigationContextOptions<T> {
  disabled?: MaybeRefOrGetter<boolean>
}

export function useNavigation<T = unknown>(options?: NavigationOptions<T>) {
  const context = options
    ? useNavigationContext(options as NavigationContextOptions<unknown>)
    : useNavigationContext()

  const parentBranch = useBranch()
  const branch = createBranch(parentBranch, undefined, options?.disabled)

  provideBranch(branch)

  if (branch.path.length === 0) {
    provideNavigationContext(context)
  }

  return {
    context,
    branch,
    isFocused: computed(() => context.activeBranchKey.value === branch.key),
  }
}