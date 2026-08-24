<script lang="ts" setup>
import { Skeleton, Table, type UITableColumn } from '@dotdev/ui-kit'

const items = [
  { name: 'Vue', stars: 48000, license: 'MIT' },
  { name: 'React', stars: 230000, license: 'MIT' },
  { name: 'Svelte', stars: 82000, license: 'MIT' },
]

type Item = (typeof items)[number]

const columns: UITableColumn<Item>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]
</script>

<template>
  <Table :columns="columns" :data="items">
    <template #loading-column>
      <Skeleton class="w-1/2" />
    </template>
  </Table>
</template>
