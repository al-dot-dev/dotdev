<script lang="ts" setup>
import { Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select v-model="value" :options="options" placeholder="Outlined" variant="outlined" />
    <Select v-model="value" :options="options" placeholder="Soft" variant="soft" />
    <Select v-model="value" :options="options" placeholder="Underlined" variant="underlined" />
    <Select v-model="value" :options="options" placeholder="Plain" variant="plain" />
  </div>
</template>
