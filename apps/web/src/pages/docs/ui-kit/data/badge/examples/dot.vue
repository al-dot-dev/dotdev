<script lang="ts" setup>
import { Badge } from '@dotdev/ui-kit'
</script>

<template>
  <Badge color="success" dot label="Online" />
  <Badge color="danger" dot label="Offline" />
  <Badge color="warning" dot label="Away" />
  <Badge color="neutral" dot label="Unknown" />

  <Badge color="success" dot ring />
  <Badge color="danger" dot ring />
  <Badge color="warning" dot ring />
  <Badge color="neutral" dot ring />

  <Badge color="success" dot />
  <Badge color="danger" dot />
  <Badge color="warning" dot />
  <Badge color="neutral" dot />
</template>
