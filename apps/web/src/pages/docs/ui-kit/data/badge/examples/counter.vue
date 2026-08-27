<script lang="ts" setup>
import { Badge } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex gap-4 w-full justify-center flex-wrap">
    <Badge color="danger">
      <span class="font-bold">3</span>
    </Badge>
    <Badge color="danger">
      <span class="font-bold">24</span>
    </Badge>
    <Badge color="danger">
      <span class="font-bold">99+</span>
    </Badge>
    <Badge color="primary" label="Tasks">
      <span class="font-bold">7</span>
    </Badge>
    <Badge color="success" label="Passed">
      <span class="font-bold">128</span>
    </Badge>
    <Badge color="warning" label="Pending">
      <span class="font-bold">5</span>
    </Badge>
    <Badge color="danger" dot>
      <span class="font-bold">99+</span>
    </Badge>
    <Badge color="danger" variant="solid">
      <span class="font-bold">6</span>
    </Badge>
  </div>
</template>
