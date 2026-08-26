<script lang="ts" setup>
import { Accordion } from '@dotdev/ui-kit'

const items = [
  { value: 'This section is always accessible.', label: 'Enabled section' },
  { value: 'This section is always accessible.', label: 'Enabled section' },
  { value: 'This section is always accessible.', label: 'Enabled section' },
]
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <Accordion :items="items" disabled label-key="label" value-key="value" />
  </div>
</template>
