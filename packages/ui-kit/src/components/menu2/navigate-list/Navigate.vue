<script lang="ts" setup>
import { watch } from 'vue'
import { useNavigate } from './navigate.ts'
import { useKeyboardNavigation } from '../useKeyboardNavigation.ts'
import { useGlobalEvent } from '@dotdev/ui-kit'

defineOptions({ inheritAttrs: false })

interface Props {
  root?: HTMLElement | null
  depth?: number
  disabled?: boolean
}

const props = defineProps<Props>()

const { paths, focused, currentIndex } = useNavigate({
  disabled: () => props.disabled,
})

const { onKeydown } = useKeyboardNavigation({
  focusedIndex: currentIndex,
  items: paths,
  enabled: focused,
  onKeydown(context) {},
})

function ensureFocus() {
  if (currentIndex.value < 0) {
    currentIndex.value = 0
  }
}

watch(focused, (isFocused) => {
  if (isFocused) props.root?.focus()
})

useGlobalEvent('keydown', onKeydown, { watch: focused })

defineExpose({
  focused,
  onKeydown,
  ensureFocus,
})
</script>

<template>
  <slot />
</template>
