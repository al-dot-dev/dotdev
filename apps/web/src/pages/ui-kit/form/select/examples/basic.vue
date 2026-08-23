<script lang="ts" setup>
import { Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <Select v-model="value" :options="options" placeholder="Choose a city" />
</template>
