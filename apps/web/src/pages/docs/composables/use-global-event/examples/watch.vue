<script lang="ts" setup>
import { Switch, useGlobalEvent } from '@dotdev/ui-kit'
import { ref } from 'vue'

const enabled = ref(true)
const clicks = ref(0)

useGlobalEvent('click', () => clicks.value++, { target: window, watch: enabled, immediate: true })
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch v-model="enabled" />
    <p class="font-mono text-xs text-muted">clicks captured: {{ clicks }}</p>
  </div>
</template>
