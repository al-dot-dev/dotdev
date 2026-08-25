<script lang="ts" setup>
import { Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select :invalid="!value" v-model="value" :items="options" deselectable placeholder="Required field" />
    <Select invalid v-model="value" :items="options" placeholder="Always invalid" />
  </div>
</template>
