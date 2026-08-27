<script lang="ts" setup>
import { Avatar } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex -space-x-3 w-full justify-center">
    <Avatar alt="User 1" border src="https://i.pravatar.cc/100?img=1" />
    <Avatar alt="User 2" border src="https://i.pravatar.cc/100?img=2" />
    <Avatar alt="User 3" border src="https://i.pravatar.cc/100?img=3" />
    <Avatar alt="User 4" border src="https://i.pravatar.cc/100?img=4" />
    <Avatar alt="User 5" border src="https://i.pravatar.cc/100?img=5" />
  </div>

  <div class="flex -space-x-2 w-full text-sm justify-center">
    <Avatar border color="primary" label="AL" />
    <Avatar border color="success" label="BK" />
    <Avatar border color="danger" label="CD" />
    <Avatar border color="info" label="EM" />
    <Avatar border color="neutral" label="+3" />
  </div>
</template>
