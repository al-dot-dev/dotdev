<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Drawer } from '@dotdev/ui-kit'

const isOpen = ref(false)

function canClose(): boolean {
  return window.confirm('Are you sure you want to close this drawer?')
}
</script>

<template>
  <Button @click="isOpen = true">Open with confirmation</Button>

  <Drawer v-model="isOpen" title="Confirm close" :can-close="canClose">
    <p class="text-sm text-muted">
      Try closing this drawer. A confirmation prompt will appear before it closes.
    </p>

    <template #footer>
      <Button @click="isOpen = false">Close</Button>
    </template>
  </Drawer>
</template>
