<script lang="ts" setup>
import { Skeleton } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex flex-col">
    <span>Lorem ipsum dolor sit amet.</span>
    <span>Lorem ipsum dolor sit amet.</span>
    <span>Lorem ipsum dolor sit amet.</span>
  </div>
  <Skeleton :lines="3" class="w-xs" text />

  <div class="flex gap-3 text-xl">
    <div class="flex flex-col">
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem ipsum dolor sit amet.</span>
    </div>
    <Skeleton :lines="3" class="w-xs" text />
  </div>
</template>
