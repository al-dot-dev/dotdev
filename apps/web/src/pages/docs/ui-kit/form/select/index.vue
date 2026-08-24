<script lang="ts" setup>
import { defineDocPage, DocPage } from '@dotdev/studio'
import basic from './examples/basic.vue'
import customOptions from './examples/custom-options.vue'
import deselectable from './examples/deselectable.vue'
import disabled from './examples/disabled.vue'
import invalid from './examples/invalid.vue'
import multiple from './examples/multiple.vue'
import object from './examples/object.vue'
import sizes from './examples/sizes.vue'
import variants from './examples/variants.vue'

defineDocPage({
  title: 'Select',
  icon: 'component-1',
  styleScope: 'select',
  description: `An accessible combobox that opens a floating listbox. Supports single and multiple selection through a typed <code>v-model</code>, object options with custom label/value keys, custom option rendering and full keyboard navigation.`,
  sources: import.meta.glob('./examples/*.{vue,ts}', { query: '?raw', eager: true, import: 'default' }),
  examples: [
    {
      title: 'Basic usage',
      description: `Use <code>v-model</code> to control the selected value and provide available options through the <code>options</code> prop. The <code>placeholder</code> is shown while no value is selected.`,
      preview: basic,
    },
    {
      title: 'Object options',
      description: `Use <code>label-key</code> to specify the property displayed in the trigger and the list, and <code>value-key</code> to define the unique value used for selection when working with object options.`,
      preview: object,
    },
    {
      title: 'Multiple selection',
      description: `Use the <code>multiple</code> prop to allow selecting multiple options. The <code>v-model</code> value should be an array containing all selected options, and the listbox stays open after each pick.`,
      preview: multiple,
    },
    {
      title: 'Deselectable',
      description: `Use the <code>deselectable</code> prop to allow clearing the current selection. This works with both single and multiple selection modes.`,
      preview: deselectable,
    },
    {
      title: 'Sizes',
      description: `Adjust the component size using the <code>size</code> prop. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
      preview: sizes,
    },
    {
      title: 'Variants',
      description: `Use the <code>variant</code> prop to control the visual style. The <code>soft</code> variant adds a soft background, <code>underlined</code> keeps only the bottom border, and <code>plain</code> removes the container styling for custom layouts.`,
      preview: variants,
    },
    {
      title: 'Custom options',
      description: `The default slot replaces the option content inside the listbox. The slot scope exposes the raw <code>option</code> along with its <code>label</code> and selection state, so each row can be rendered freely.`,
      preview: customOptions,
    },
    {
      title: 'Disabled state',
      description: `Use the <code>disabled</code> prop to disable the entire component or <code>option-disabled</code> to disable specific options. Disabled options remain visible but cannot be selected.`,
      preview: disabled,
    },
    {
      title: 'Invalid state',
      description: `Apply the <code>invalid</code> prop to visually indicate a validation error state.`,
      preview: invalid,
    },
  ],
})
</script>

<template>
  <DocPage />
</template>
