<script lang="ts" setup>
import { useNavigationItem } from './context/index.ts'
import { computed } from 'vue'

interface Props {
  index: number
  disabled?: boolean
}

const props = defineProps<Props>()

const { branch, navigation } = useNavigationItem({
  index: () => props.index,
  disabled: () => props.disabled,
})

const isFocused = computed(() => navigation.key.value === branch.key)
</script>

<template>
  <slot :focused="isFocused" />
</template>
