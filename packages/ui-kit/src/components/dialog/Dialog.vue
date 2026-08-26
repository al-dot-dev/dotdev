<script lang="ts" setup>
import type { UIDialogEmits, UIDialogExpose, UIDialogProps, UIDialogSlots } from './dialog.types.ts'
import { computed, nextTick, ref, useId, useTemplateRef, watch } from 'vue'
import { Icon, useGlobalEvent, useUiKit } from '@dotdev/ui-kit'
import { dialogStyle } from '@dotdev/theme'

const UI_NAME = 'dialog'

defineOptions({
  inheritAttrs: false,
})

defineSlots<UIDialogSlots>()
const emit = defineEmits<UIDialogEmits>()
const props = withDefaults(defineProps<UIDialogProps>(), {
  ui: UI_NAME,
  closable: true,
  dismissable: true,
  closeOnEscape: true,
  placement: 'center',
})

const { ui, bem } = useUiKit(UI_NAME, props, dialogStyle)

const model = defineModel<boolean>({ default: false })
const visible = ref(model.value)
const isClosing = ref(false)

const closeRef = useTemplateRef<HTMLElement>('closeRef')

const id = useId()
const titleId = `${UI_NAME}-title-${id}`

const rootClass = computed(() => {
  const { placement } = ui
  return bem([placement])
})

const panelAttrs = computed(() => {
  const attrs: Record<string, string | undefined> = {
    'aria-modal': 'true',
    role: 'dialog',
  }

  if (props.title) {
    attrs['aria-labelledby'] = titleId
  }

  return attrs
})

function open() {
  if (visible.value) return

  visible.value = true

  if (!model.value) {
    model.value = true
  }

  emit('open')
}

async function requestClose() {
  if (!visible.value || isClosing.value) {
    return
  }

  isClosing.value = true

  try {
    const allowed = (await ui.canClose?.()) ?? true

    if (allowed) {
      visible.value = false

      if (model.value) {
        model.value = false
      }

      emit('close')
    } else {
      if (!model.value) {
        model.value = true
      }
    }
  } finally {
    isClosing.value = false
  }
}

function close() {
  return requestClose()
}

function toggle() {
  if (visible.value) return requestClose()
  open()
}

function onBackdropClick() {
  if (!props.dismissable) return
  requestClose()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEscape && visible.value) {
    event.stopPropagation()
    requestClose()
    return
  }
}

useGlobalEvent('keydown', onKeydown, {
  watch: visible,
})

watch(model, (requestedVisible) => {
  if (requestedVisible === visible.value) return

  if (requestedVisible) {
    visible.value = true
    return
  }

  requestClose()
})

/* prettier-ignore */
watch(visible, (isVisible) => {
  document.body.style.overflow = isVisible ? 'hidden' : ''
  isVisible && nextTick(() => closeRef.value?.focus())
}, { immediate: true })

defineExpose<UIDialogExpose>({
  isVisible: visible,
  open,
  close,
  toggle,
})
</script>

<template>
  <Teleport to="body">
    <Transition :name="ui.ui">
      <div v-if="visible" :class="rootClass" @click="onBackdropClick">
        <div :class="bem('panel')" v-bind="{ ...panelAttrs, ...$attrs }" @click.stop>
          <div v-if="$slots.header || title || closable" :class="bem('header')">
            <h2 v-if="title" :id="titleId" :class="bem('title')">
              {{ title }}
            </h2>

            <slot name="header" />

            <button
              v-if="closable"
              ref="closeRef"
              :class="bem('close')"
              :disabled="isClosing"
              aria-label="Close"
              type="button"
              @click="requestClose"
            >
              <slot name="close">
                <Icon aria-hidden="true" name="cross-1" />
              </slot>
            </button>
          </div>

          <div :class="bem('body')">
            <slot />
          </div>

          <div v-if="$slots.footer" :class="bem('footer')">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
