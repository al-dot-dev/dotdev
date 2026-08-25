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
    <Select :option-disabled="isOptionDisabled" v-model="value" :items="options" placeholder="Choose a city" />
    <Select disabled v-model="valueList" :items="options" placeholder="Disabled" />
  </div>
</template>
