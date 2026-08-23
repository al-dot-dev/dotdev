<script lang="ts" setup>
import { Tabs } from '@dotdev/ui-kit'
import { ref } from 'vue'

const options = ['Account', 'Notifications', 'Appearance']

const selected = ref('Account')
</script>

<template>
  <div class="w-96">
    <Tabs v-model="selected" :options="options">
      <template #panel="{ label }">
        <p class="bg-surface rounded-lg p-4 text-sm text-muted">{{ label }} settings live here.</p>
      </template>
    </Tabs>

    <p class="mt-2 font-mono text-xs text-muted">model: {{ selected }} — try arrow keys on the list</p>
  </div>
</template>
