<script lang="ts" setup>
import { ref } from 'vue'
import { Pagination } from '@dotdev/ui-kit'

const page = ref(25)
const widePage = ref(25)
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <Pagination v-model="page" :total="500" :page-size="10" />
    <Pagination v-model="widePage" :total="500" :page-size="10" :sibling-count="3" />
  </div>
</template>
