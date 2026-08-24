<script lang="ts" setup>
import { Select } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>()
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select v-model="value" :options="options" placeholder="Size sm" size="sm" />
    <Select v-model="value" :options="options" placeholder="Size md" size="md" />
    <Select v-model="value" :options="options" placeholder="Size lg" size="lg" />
  </div>
</template>
