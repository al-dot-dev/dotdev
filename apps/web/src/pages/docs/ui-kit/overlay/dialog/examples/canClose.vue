<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Dialog } from '@dotdev/ui-kit'

const isOpen = ref(false)

function canClose(): boolean {
  return window.confirm('Are you sure you want to close this dialog?')
}
</script>

<template>
  <Button @click="isOpen = true">Open with confirmation</Button>

  <Dialog v-model="isOpen" title="Confirm close" :can-close="canClose">
    <p class="text-sm text-muted">
      Try closing this dialog. A confirmation prompt will appear before it closes.
    </p>

    <template #footer>
      <Button @click="isOpen = false">Close</Button>
    </template>
  </Dialog>
</template>
