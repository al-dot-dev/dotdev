<script lang="ts" setup>
import { useNavigationItem } from './composables/useNavigationItem.ts'

interface Props {
  index: number
  disabled?: boolean
}

const props = defineProps<Props>()

const { isFocused } = useNavigationItem({
  index: () => props.index,
  disabled: () => props.disabled,
})
</script>

<template>
  <slot :focused="isFocused" />
</template>