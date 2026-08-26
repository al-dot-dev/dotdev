<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { Accordion, Button } from '@dotdev/ui-kit'

const items = [
  { value: 'First section content.', label: 'First' },
  { value: 'Second section content.', label: 'Second' },
  { value: 'Third section content.', label: 'Third' },
]

const accordion = useTemplateRef('accordion')

function toggleFirst() {
  accordion.value?.toggle(items[0])
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <Button @click="toggleFirst">Toggle first</Button>

    <Accordion
      ref="accordion"
      :items="items"
      label-key="label"
      value-key="value"
    />
  </div>
</template>
