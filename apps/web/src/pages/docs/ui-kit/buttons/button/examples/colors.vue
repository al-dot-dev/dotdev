<script lang="ts" setup>
import { Button } from '@dotdev/ui-kit'

const colors = ['primary', 'neutral', 'warning', 'success', 'danger', 'info'] as const
const variants = ['solid', 'outlined', 'soft', 'ghost', 'text'] as const
</script>

<template>
  <div class="grid grid-cols-[repeat(5,minmax(max-content,1fr))] gap-4">
    <template v-for="color in colors" :key="color">
      <template v-for="variant in variants" :key="variant">
        <Button :color="color" :variant="variant" label="Button" />
      </template>
    </template>
  </div>
</template>
