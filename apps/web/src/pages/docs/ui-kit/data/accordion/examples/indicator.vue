<script lang="ts" setup>
import { Accordion, Icon } from '@dotdev/ui-kit'

const items = [
  { value: 'Custom indicator shown on the right side of the trigger.', label: 'Chevron down' },
  { value: 'Replace the default indicator with any icon.', label: 'Plus / Minus' },
  { value: 'The indicator rotates when the panel opens.', label: 'Arrow' },
]
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <Accordion :items="items" label-key="label" value-key="value">
      <template #indicator="{ expanded }">
        <Icon :class="expanded && 'rotate-90'" class="transition-transform" name="chevron-right" />
      </template>
    </Accordion>
  </div>
</template>
