<script lang="ts" setup>
import { Badge } from '@dotdev/ui-kit'
</script>

<template>
  <Badge label="Count">
    <span class="font-bold">42</span>
  </Badge>
  <Badge color="success" label="Status">
    ✓ Passed
  </Badge>
  <Badge color="danger" label="Status">
    ✗ Failed
  </Badge>
  <Badge>
    <span class="font-bold">Custom</span> content
  </Badge>
</template>
