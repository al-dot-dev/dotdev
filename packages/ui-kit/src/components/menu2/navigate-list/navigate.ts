import {
  type ComponentInternalInstance,
  computed,
  type ComputedRef,
  getCurrentInstance,
  inject,
  type InjectionKey,
  type MaybeRefOrGetter,
  provide,
  type Ref,
  ref,
  type ShallowReactive,
  shallowReactive,
  toValue,
  watch,
} from 'vue'

type NavigationPath = readonly number[]

interface NavigationState<T = unknown> {
  entries: ShallowReactive<Map<NavigationPath, T>>
  paths: ComputedRef<NavigationPath[]>
  currentIndex: Ref<number>
  focusedPath: ComputedRef<NavigationPath | undefined>
}

interface NavigationBranch {
  path: NavigationPath
  component: ComponentInternalInstance | null
  disabled: ComputedRef<boolean>
}

interface NavigationScope {
  focused: ComputedRef<boolean>
}

const NAVIGATION_KEY: InjectionKey<NavigationState> = Symbol('navigation')
const BRANCH_KEY: InjectionKey<NavigationBranch> = Symbol('navigation-branch')
const SCOPE_KEY: InjectionKey<NavigationScope> = Symbol('navigation-scope')

function createNavigationState<T>(): NavigationState<T> {
  const entries = shallowReactive(new Map<NavigationPath, T>())
  const sortedPaths = computed(() => [...entries.keys()].sort(comparePaths))
  const focusedIndex = ref(-1)
  const focusedPath = computed(() => sortedPaths.value[focusedIndex.value])

  return {
    entries,
    paths: sortedPaths,
    currentIndex: focusedIndex,
    focusedPath,
  }
}

function useNavigationState() {
  return inject(NAVIGATION_KEY, null) ?? createNavigationState()
}

function useNavigationBranch(disabled?: MaybeRefOrGetter<boolean>): NavigationBranch {
  const parent = inject(BRANCH_KEY, null)

  return {
    component: getCurrentInstance(), // children items instance
    key: parent?.path ?? ([] as NavigationPath), // item [1,1]
    disabled: computed(() => (parent?.disabled.value ?? false) || (toValue(disabled) ?? false)),
  }
}

interface NavigateOptions {
  disabled?: MaybeRefOrGetter<boolean>
}

export function useNavigate(options: NavigateOptions) {
  const navigation = useNavigationState()
  const branch = useNavigationBranch(options.disabled)

  const focused = computed(() => {
    const focusedPath = navigation.focusedPath.value
    return focusedPath !== undefined && comparePaths(focusedPath.slice(0, -1), branch.path) === 0
  })

  provide(NAVIGATION_KEY, navigation)
  provide(SCOPE_KEY, { focused })
  provide(BRANCH_KEY, branch)

  return { ...navigation, focused, branch }
}

export function useNavigateItem<T>(value: T, index: number, disabled: MaybeRefOrGetter<boolean> = false) {
  const navigation = useNavigationState()
  const parent = useNavigationBranch()

  const path = [...parent.path, index] as NavigationPath

  const isDisabled = computed(() => parent.disabled.value || toValue(disabled))

  const isFocused = computed(() => {
    const focusedPath = navigation.focusedPath.value
    return focusedPath !== undefined && comparePaths(focusedPath, path) === 0
  })

  provide(BRANCH_KEY, {
    component: parent.component,
    key: path,
    disabled: isDisabled,
  })

  watch(
    isDisabled,
    (disabled, _, onCleanup) => {
      if (disabled) return
      navigation.entries.set(path, value)
      onCleanup(() => navigation.entries.delete(path))
    },
    { immediate: true },
  )

  return {
    path,
    disabled: isDisabled,
    focused: isFocused,
  }
}

function comparePaths(a: NavigationPath, b: NavigationPath): number {
  const length = Math.min(a.length, b.length)

  for (let i = 0; i < length; i++) {
    const difference = a[i] - b[i]

    if (difference !== 0) {
      return difference
    }
  }

  return a.length - b.length
}
