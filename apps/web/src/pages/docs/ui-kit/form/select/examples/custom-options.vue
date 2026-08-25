<script lang="ts" setup>
import { Icon, Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

interface City {
  id: number
  name: string
  country: string
}

const value = ref<City>()
const options: City[] = [
  { id: 1, name: 'Berlin', country: 'Germany' },
  { id: 2, name: 'London', country: 'UK' },
  { id: 3, name: 'Paris', country: 'France' },
  { id: 4, name: 'Tokyo', country: 'Japan' },
  { id: 5, name: 'New York', country: 'USA' },
]
</script>

<template>
  <Select v-model="value" #default="{ option }" label-key="name" :items="options" placeholder="Choose a city" value-key="id">
    <span class="flex items-center gap-2">
      <Icon class="text-muted" name="globe" />
      {{ option.name }}
      <span class="ml-auto font-mono text-xs text-muted">{{ option.country }}</span>
    </span>
  </Select>
</template>
