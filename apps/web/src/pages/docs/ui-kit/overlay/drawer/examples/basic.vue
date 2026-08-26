<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Drawer } from '@dotdev/ui-kit'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open drawer</Button>

  <Drawer v-model="isOpen" title="Drawer title">
    <p class="text-sm text-muted">This is a basic drawer with a header, body content, and a close button.</p>

    <template #footer>
      <Button variant="soft" @click="isOpen = false">Cancel</Button>
      <Button @click="isOpen = false">Confirm</Button>
    </template>
  </Drawer>
</template>
