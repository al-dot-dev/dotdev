<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Dialog } from '@dotdev/ui-kit'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open dialog</Button>

  <Dialog v-model="isOpen" title="Dialog title">
    <p class="text-sm text-muted">This is a basic dialog with a header, body content, and a close button.</p>
    <template #footer>
      <Button variant="soft" @click="isOpen = false">Cancel</Button>
      <Button @click="isOpen = false">Confirm</Button>
    </template>
  </Dialog>
</template>
