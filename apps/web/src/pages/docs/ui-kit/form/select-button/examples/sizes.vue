<script lang="ts" setup>
import { SelectButton } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo']
</script>

<template>
  <SelectButton v-model="value" :items="options" size="sm" />
  <SelectButton v-model="value" :items="options" size="md" />
  <SelectButton v-model="value" :items="options" size="lg" />
</template>
