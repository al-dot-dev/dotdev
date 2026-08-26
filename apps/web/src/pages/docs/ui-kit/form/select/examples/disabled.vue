<script lang="ts" setup>
import { Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>()
const valueList = ref<string[]>([])
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']

function isOptionDisabled(option: string) {
  return option === 'London' || option === 'Tokyo'
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select v-model="value" :item-disabled="isOptionDisabled" :items="options" placeholder="Choose a city" />
    <Select v-model="valueList" :items="options" disabled placeholder="Disabled" />
  </div>
</template>
