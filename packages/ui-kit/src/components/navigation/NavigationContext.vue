<script generic="T" lang="ts" setup>
import { useNavigation } from './context/index.ts'
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useKeyboardNavigation } from './useKeyboardNavigation.ts'

interface Props {
  tree: T[]
  childrenKey?: keyof T
  disabled?: boolean
}

const props = defineProps<Props>()

const { navigation, branch } = useNavigation<T>({
  tree: () => props.tree,
  childrenKey: () => props.childrenKey,
  disabled: () => props.disabled,
})

const isKeyboardEnabled = ref(false)

const { onKeydown } = useKeyboardNavigation({
  focusedIndex: navigation.index,
  items: navigation.paths,
  enabled: isKeyboardEnabled,
})

function toggleEnabled(event: Event) {
  isKeyboardEnabled.value = event.type === 'focusin'
}

const isFocused = computed(() => navigation.branchKey.value === branch.key)

onMounted(() => {
  const instance = getCurrentInstance()?.parent
  if (!instance) return

  const rootEl = instance.proxy?.$el

  if (rootEl instanceof HTMLElement) {
    watch(isFocused, (focused) => focused && rootEl.focus(), { immediate: true })

    rootEl.addEventListener('focusin', toggleEnabled)
    rootEl.addEventListener('focusout', toggleEnabled)
    rootEl.addEventListener('keydown', onKeydown)

    onBeforeUnmount(() => {
      rootEl.removeEventListener('focusin', toggleEnabled)
      rootEl.removeEventListener('focusout', toggleEnabled)
      rootEl.removeEventListener('keydown', onKeydown)
    })
  }
})
</script>

<template>
  <slot />
</template>
