<script lang="ts" setup>
import { Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

interface City {
  id: number
  name: string
}

const value = ref<City>()
const options: City[] = [
  { id: 1, name: 'Berlin' },
  { id: 2, name: 'London' },
  { id: 3, name: 'Paris' },
  { id: 4, name: 'Tokyo' },
  { id: 5, name: 'New York' },
]
</script>

<template>
  <Select v-model="value" :items="options" label-key="name" value-key="id" placeholder="Choose a city" />
</template>
