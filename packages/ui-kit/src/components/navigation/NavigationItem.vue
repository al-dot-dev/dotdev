<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue'
import { useNavigationItem } from './composables/useNavigationItem.ts'

interface Props {
  index: number
  disabled?: boolean
}

const props = defineProps<Props>()

const { branch, navigation } = useNavigationItem({
  index: () => props.index,
  disabled: () => props.disabled,
})

const isFocused = computed(() => navigation.focusedKey.value === branch.key)
const element = useTemplateRef('element')
</script>

<template>
  <li ref="element" @click.stop="navigation.setFocus(branch.key)">
    <slot :key="branch.key" :disabled="branch.disabled" :element="element" :focused="isFocused" />
  </li>
</template>
