<script lang="ts" setup>
import { Avatar } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex -space-x-3 w-full justify-center">
    <Avatar src="https://i.pravatar.cc/100?img=1" alt="User 1" border />
    <Avatar src="https://i.pravatar.cc/100?img=2" alt="User 2" border />
    <Avatar src="https://i.pravatar.cc/100?img=3" alt="User 3" border />
    <Avatar src="https://i.pravatar.cc/100?img=4" alt="User 4" border />
    <Avatar src="https://i.pravatar.cc/100?img=5" alt="User 5" border />
  </div>

  <div class="flex -space-x-2 w-full justify-center">
    <Avatar class="text-xs" label="AL" border />
    <Avatar class="text-xs" label="BK" border />
    <Avatar class="text-xs" label="CD" border />
    <Avatar class="text-xs" label="EM" border />
    <Avatar class="text-xs" label="+3" border />
  </div>
</template>
