<script lang="ts" setup>
import type { CSSProperties, VNodeRef } from 'vue'
import { computed, ref } from 'vue'
import type { UICollapseEmits, UICollapseProps, UICollapseSlots } from './collapse.types'
import { useClickOutside, useCollapse } from '@dotdev/ui-kit'

defineSlots<UICollapseSlots>()
const emits = defineEmits<UICollapseEmits>()
const props = withDefaults(defineProps<UICollapseProps>(), {
  strategy: 'absolute',
  placement: 'bottom',
  dismissable: true,
})

const isOpen = ref<boolean>(false)
const anchor = ref<HTMLElement | null>(null)
const collapse = ref<HTMLElement | null>(null)

const collapseConfig = computed(() => ({
  placement: props.placement,
  strategy: props.strategy,
  offset: props.offset,
  autoUpdate: props.autoUpdate,
  handleScroll: close,
}))

const { styles } = useCollapse(anchor, collapse, collapseConfig)

const collapseStyle = computed<CSSProperties>(() => ({
  ...styles.value,
  width: props.fit && anchor.value ? `${anchor.value.clientWidth}px` : undefined,
}))

function setCollapseRef(el: HTMLElement | null) {
  collapse.value = el
}

function open(event?: Event) {
  const target = event?.currentTarget

  if (!(target instanceof HTMLElement)) {
    return
  }

  anchor.value = target
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle(event?: Event) {
  isOpen.value ? close() : open(event)
}

function outsideClose(event: MouseEvent) {
  close()
  emits('click-outside', event)
}

if (props.dismissable) {
  useClickOutside([anchor, collapse], outsideClose, isOpen)
}

defineExpose({
  isOpen,
  toggle,
  close,
  open,
})
</script>

<template>
  <slot
    :ref="setCollapseRef as VNodeRef | undefined"
    :close="close"
    :is-open="isOpen"
    :open="open"
    :style="collapseStyle"
    :toggle="toggle"
  />
</template>
