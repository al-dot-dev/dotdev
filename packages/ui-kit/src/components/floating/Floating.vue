<script lang="ts" setup>
import { computed, type CSSProperties, ref, toValue, type VNodeRef, watch, watchEffect } from 'vue'
import type { UIFloatingEmits, UIFloatingProps, UIFloatingSlots } from './floating.types'
import { useClickOutside, useFloating } from '@dotdev/ui-kit'

defineSlots<UIFloatingSlots>()
const emits = defineEmits<UIFloatingEmits>()
const props = withDefaults(defineProps<UIFloatingProps>(), {
  strategy: 'absolute',
  placement: 'bottom',
  dismissable: true,
})

const model = defineModel<boolean>()
const isOpen = ref<boolean>(false)
const anchor = ref<HTMLElement | null | undefined>(null)
const floating = ref<HTMLElement | null | undefined>(null)

watch(model, (value) => {
  value ? open() : close()
})

const floatingConfig = computed(() => ({
  placement: props.placement,
  strategy: props.strategy,
  offset: props.offset,
  autoUpdate: props.autoUpdate,
  handleScroll: close,
}))

const { styles } = useFloating(anchor, floating, floatingConfig)

const floatingStyle = computed<CSSProperties>(() => ({
  ...styles.value,
  width: props.fit && anchor.value ? `${anchor.value.clientWidth}px` : undefined,
}))

watchEffect(() => {
  if (props.target) {
    anchor.value = toValue(props.target)
  }

  if (props.floating) {
    floating.value = toValue(props.floating)
  }
})

function setFloatingRef(el?: HTMLElement) {
  floating.value = el
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
  useClickOutside([anchor, floating], outsideClose, isOpen)
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
    :ref="setFloatingRef as unknown as VNodeRef | undefined"
    :close="close"
    :is-open="isOpen"
    :open="open"
    :style="floatingStyle"
    :toggle="toggle"
  />
</template>
