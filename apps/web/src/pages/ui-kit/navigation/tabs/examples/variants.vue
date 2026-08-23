<script lang="ts" setup>
import { Tabs } from '@dotdev/ui-kit'
import { ref } from 'vue'

const options = ['Day', 'Week', 'Month']

const soft = ref('Week')
const outlined = ref('Month')
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-start gap-2">
      <span class="type-xs font-medium uppercase tracking-wider text-muted">soft</span>
      <Tabs v-model="soft" :options="options" variant="soft" />
    </div>

    <div class="flex flex-col items-start gap-2">
      <span class="type-xs font-medium uppercase tracking-wider text-muted">outlined</span>
      <Tabs v-model="outlined" :options="options" variant="outlined" />
    </div>
  </div>
</template>
