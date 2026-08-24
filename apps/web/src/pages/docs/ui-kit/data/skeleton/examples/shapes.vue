<script lang="ts" setup>
import { Skeleton } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex items-center gap-4 w-full max-w-sm">
    <Skeleton class="w-12" rounded square />

    <div class="flex w-full flex-col gap-2">
      <Skeleton :lines="2" class="w-2/3" text />
    </div>
  </div>
</template>
