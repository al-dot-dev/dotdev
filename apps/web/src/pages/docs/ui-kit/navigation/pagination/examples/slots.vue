<script lang="ts" setup>
import { ref } from 'vue'
import { Icon, Pagination } from '@dotdev/ui-kit'

const page = ref(5)
</script>

<template>
  <Pagination v-model="page" :total="90" :page-size="10">
    <template #prev>
      <Icon name="chevron-left" />
      <span class="ml-1">Prev</span>
    </template>
    <template #next>
      <span class="mr-1">Next</span>
      <Icon name="chevron-right" />
    </template>
  </Pagination>
</template>
