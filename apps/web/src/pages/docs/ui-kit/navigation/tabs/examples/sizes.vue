<script lang="ts" setup>
import { Tabs } from '@dotdev/ui-kit'
import { ref } from 'vue'

const options = ['Preview', 'Code']

const small = ref('Preview')
const medium = ref('Preview')
const large = ref('Code')
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Tabs v-model="small" :options="options" size="sm" />
    <Tabs v-model="medium" :options="options" size="md" />
    <Tabs v-model="large" :options="options" size="lg" />
  </div>
</template>
