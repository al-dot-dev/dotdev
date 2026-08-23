<script lang="ts" setup>
import { Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

const valueList = ref<string[]>([])
const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <Select v-model="value" :options="options" deselectable placeholder="Choose a city" />
  <Select v-model="valueList" :options="options" deselectable multiple placeholder="Choose cities" />
</template>
