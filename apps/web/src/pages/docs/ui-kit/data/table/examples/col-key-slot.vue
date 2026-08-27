<script lang="ts" setup>
import { Avatar, Table, Tag, type UITableColumn } from '@dotdev/ui-kit'

const users = [
  { name: 'Alice', role: 'Admin', status: 'active', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Bob', role: 'Editor', status: 'active', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Charlie', role: 'Viewer', status: 'invited', avatar: 'https://i.pravatar.cc/40?img=5' },
  { name: 'Diana', role: 'Editor', status: 'suspended', avatar: 'https://i.pravatar.cc/40?img=8' },
] as any

type User = (typeof users)[number]

const columns: UITableColumn<User>[] = [
  { key: 'name', header: 'User' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]

const statusColor = {
  active: 'success',
  invited: 'info',
  suspended: 'danger',
} as any
</script>

<template>
  <Table :columns="columns" :data="users">
    <template #col-name="{ value, data }">
      <div class="flex items-center gap-2">
        <Avatar :alt="String(value)" :src="data.avatar" class="text-xs" />
        <span>{{ value }}</span>
      </div>
    </template>
    <template #col-status="{ value }">
      <Tag :color="statusColor[value]" :label="String(value)" />
    </template>
  </Table>
</template>
