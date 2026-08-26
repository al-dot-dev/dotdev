<script lang="ts" setup>
import type { UIDrawerEmits, UIDrawerExpose, UIDrawerProps, UIDrawerSlots } from './drawer.types.ts'
import { computed, useTemplateRef } from 'vue'
import { Dialog, useUiKit } from '@dotdev/ui-kit'
import { drawerStyle } from '@dotdev/theme'

const UI_NAME = 'drawer'

defineOptions({
  inheritAttrs: false,
})

defineSlots<UIDrawerSlots>()
const emit = defineEmits<UIDrawerEmits>()
const props = withDefaults(defineProps<UIDrawerProps>(), {
  ui: UI_NAME,
  closable: true,
  dismissable: true,
  closeOnEscape: true,
  placement: 'left',
})

const { ui } = useUiKit(UI_NAME, props, drawerStyle)

const dialog = useTemplateRef('dialog')

defineExpose<UIDrawerExpose>({
  isVisible: computed(() => !!dialog.value?.isVisible),
  open: () => dialog.value?.open(),
  close: () => dialog.value?.close(),
  toggle: () => dialog.value?.toggle(),
})
</script>

<template>
  <Dialog
    ref="dialog"
    v-bind="ui"
    @close="emit('close')"
    @open="emit('open')"
    @update:model-value="emit('update:modelValue', $event as boolean)"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <template v-if="$slots.close" #close>
      <slot name="close" />
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>
