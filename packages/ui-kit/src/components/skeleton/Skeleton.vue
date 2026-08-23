<script generic="T extends boolean = false" lang="ts" setup>
import { computed, inject } from 'vue'
import { asTemplateRef, useUiKitBem, useUiKitProps, useUiKitTheme } from '@dotdev/ui-kit'
import { skeletonStyle } from '@dotdev/theme'

import {
  SKELETON_PROVIDE_KEY,
  type UISkeletonEmits,
  type UISkeletonProps,
  type UISkeletonSlots,
} from './skeleton.types'

defineOptions({
  inheritAttrs: false,
})

defineEmits<UISkeletonEmits>()
defineSlots<UISkeletonSlots>()

const props = withDefaults(defineProps<UISkeletonProps<T>>(), {
  ui: 'skeleton',
  variant: 'pulse',
  rounded: false,
  loading: true,
})

const ui = useUiKitProps('skeleton', props)
const bem = useUiKitBem(ui)
useUiKitTheme(ui, skeletonStyle)

const providedLoading = inject(SKELETON_PROVIDE_KEY, null)

const loading = computed(() => providedLoading?.() ?? ui.loading)
const isText = computed(() => ui.text !== undefined)
const lineCount = computed(() => ui.lines ?? 1)

const rootClass = computed(() => {
  return bem([ui.variant], {
    rounded: ui.rounded,
    text: isText.value,
    square: ui.square !== undefined,
  })
})

const tui = asTemplateRef(ui)
</script>

<template>
  <template v-if="loading">
    <div v-if="isText" :class="[bem('wrapper'), tui.skeletonClass ?? $attrs.class]">
      <span v-for="line in lineCount" :key="line" :class="rootClass" />
    </div>

    <div v-else :class="[rootClass, tui.skeletonClass ?? $attrs.class]" />
  </template>

  <component :is="tui.is" v-else-if="tui.is" v-bind="$attrs">
    <slot />
  </component>

  <slot v-else />
</template>
