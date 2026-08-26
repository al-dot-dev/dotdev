<script generic="T, L extends keyof T, V extends keyof T, M extends boolean" lang="ts" setup>
import type { UIAccordionEmits, UIAccordionExpose, UIAccordionProps, UIAccordionSlots } from './accordion.types.ts'
import { computed, useId } from 'vue'
import { asTemplateRef, Icon, normalizeBooleanProp, Scope, useArrayModel, useUiKit } from '@dotdev/ui-kit'
import TransitionCollapse from './TransitionCollapse.vue'
import { accordionStyle } from '@dotdev/theme'

defineEmits<UIAccordionEmits<T, M>>()
defineSlots<UIAccordionSlots<T>>()

const props = withDefaults(defineProps<UIAccordionProps<T, L, V, M>>(), {
  ui: 'accordion',
  variant: 'outlined',
  items: () => [],
  deselectable: true,
})

const model = defineModel<M extends true ? T[] : T | undefined>()

const { ui, bem } = useUiKit('accordion', props, accordionStyle)
const id = useId()

const { toggle, isSelected, getItemLabel, getItemValue, isItemDisabled } = useArrayModel<T>(model, {
  valueKey: ui.valueKey,
  labelKey: ui.labelKey,
  deselectable: () => ui.deselectable,
  itemDisabled: () => ui.itemDisabled,
  multiple: () => normalizeBooleanProp(ui.multiple),
})

const rootClass = computed(() => {
  const { variant, disabled } = ui
  return bem([variant], { disabled })
})

function getItemId(index: number, part: 'trigger' | 'panel') {
  return `${id}-${part}-${index}`
}

defineExpose<UIAccordionExpose<T>>({ toggle })

const uit = asTemplateRef(ui)
</script>

<template>
  <div :class="rootClass">
    <Scope
      v-for="(item, idx) in uit.items"
      :key="idx"
      #default="scope"
      :scope="{
        disabled: isItemDisabled(item),
        index: idx,
        item: item,
        label: getItemLabel(item),
        expanded: isSelected(item),
        toggle: () => toggle(item),
        value: getItemValue(item),
      }"
    >
      <div :class="bem('item', { disabled: scope.disabled })">
        <button
          :id="getItemId(idx, 'trigger')"
          :aria-controls="getItemId(idx, 'panel')"
          :aria-expanded="scope.expanded"
          :class="bem('trigger', { expanded: scope.expanded, disabled: scope.disabled })"
          :disabled="scope.disabled"
          type="button"
          @click="toggle(item)"
        >
          <slot name="label" v-bind="scope">
            <span :class="bem('label')">{{ scope.label }}</span>
          </slot>

          <span :class="bem('indicator')">
            <slot name="indicator" v-bind="scope">
              <Icon :class="bem('indicator-icon')" aria-hidden="true" name="chevron-down" />
            </slot>
          </span>
        </button>

        <TransitionCollapse>
          <div
            v-show="scope.expanded"
            :id="getItemId(idx, 'panel')"
            :aria-labelledby="getItemId(idx, 'trigger')"
            :class="bem('panel')"
            role="region"
          >
            <slot name="content" v-bind="scope">
              <span :class="bem('value')">{{ scope.value }}</span>
            </slot>
          </div>
        </TransitionCollapse>
      </div>
    </Scope>
  </div>
</template>
