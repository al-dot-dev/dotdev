<script lang="ts" setup>
import { ref } from 'vue'
import { Pagination } from '@dotdev/ui-kit'

const page = ref(4)
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <Pagination v-model="page" :total="50" :page-size="10" />
    <p class="font-mono text-xs text-muted">Current page: {{ page }}</p>
  </div>
</template>
