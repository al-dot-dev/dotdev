<script generic="T" lang="ts" setup>
import { useNavigateItem } from './navigate.ts'

interface Props {
  index: number
  item: T
  disabled?: boolean
}

const props = defineProps<Props>()

const { focused } = useNavigateItem(props.item, props.index, props.disabled)
</script>

<template>
  <slot :focused="focused" />
</template>
