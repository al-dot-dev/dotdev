import { computed, getCurrentInstance, type MaybeRefOrGetter, onBeforeUnmount, onMounted } from 'vue'
import { navigationContext } from '../context/navigation.ts'
import { branchContext, createNextBranch } from '../context/branch.ts'

export interface NavigationContextOptions<T = unknown> {
  tree: MaybeRefOrGetter<T[]>
  childrenKey: MaybeRefOrGetter<keyof T | undefined>
  disabled?: MaybeRefOrGetter<boolean>
}

export function useNavigationContext<T>(options: NavigationContextOptions<T>) {
  const navigation = navigationContext.getOrCreate({
    tree: options.tree,
    childrenKey: options.childrenKey,
  })

  const parentBranch = branchContext.getOrCreate()
  const branch = createNextBranch(parentBranch, options.disabled)

  const isRoot = computed(() => parentBranch.path.length === 0)

  const hasFocus = computed(() => navigation.hasFocus.value)

  const isActive = computed(() => hasFocus.value && navigation.parentKey.value === branch.key)

  branchContext.provide(branch)

  if (isRoot.value) {
    navigationContext.provide(navigation)
  }

  onMounted(() => {
    navigation.instances.set(parentBranch.key, getCurrentInstance())
  })

  onBeforeUnmount(() => {
    navigation.instances.delete(parentBranch.key)
  })

  return {
    navigation,
    branch,
    isRoot,
    hasFocus,
    isActive,
  }
}
