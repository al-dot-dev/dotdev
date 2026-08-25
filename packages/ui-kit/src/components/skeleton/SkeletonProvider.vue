<script lang="ts" setup>
import { SKELETON_PROVIDE_KEY } from './skeleton.constants'
import type { UISkeletonElement } from './skeleton.types'
import { provide } from 'vue'

interface Props {
  is: UISkeletonElement
  loading: boolean
}

const props = defineProps<Props>()

provide(SKELETON_PROVIDE_KEY, () => props.loading)
</script>

<template>
  <component :is="is" v-if="is">
    <slot />
  </component>
  <slot v-else />
</template>
