<script generic="T" lang="ts" setup>
import { type Ref } from 'vue'
import { useNavigation } from './composables/useNavigation.ts'
import { useNavigationTarget } from './composables/useNavigationTarget.ts'

interface Props {
  tree: T[]
  childrenKey?: keyof T
  element?: Ref<HTMLElement | null>
  disabled?: boolean
}

const props = defineProps<Props>()

const { context, isFocused } = useNavigation<T>({
  tree: () => props.tree,
  childrenKey: () => props.childrenKey,
  disabled: () => props.disabled,
})

useNavigationTarget({
  element: props.element,
  focusedIndex: context.focusedIndex,
  items: context.pathKeys,
  isFocused,
})
</script>

<template>
  <slot />
</template>