<script lang="ts" setup>
import { ref } from 'vue'
import { Pagination } from '@dotdev/ui-kit'

const page = ref(1)
const lockedPage = ref(3)
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <Pagination v-model="page" :total="40" :page-size="10" />
    <Pagination v-model="lockedPage" :total="40" :page-size="10" disabled />
  </div>
</template>
