<script lang="ts" setup>
import { ref } from 'vue'
import { Pagination } from '@dotdev/ui-kit'

const page = ref(2)
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Pagination v-model="page" size="sm" :total="80" :page-size="10" />
    <Pagination v-model="page" size="md" :total="80" :page-size="10" />
    <Pagination v-model="page" size="lg" :total="80" :page-size="10" />
  </div>
</template>
