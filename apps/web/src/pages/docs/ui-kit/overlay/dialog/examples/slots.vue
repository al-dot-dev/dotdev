<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Dialog } from '@dotdev/ui-kit'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open custom dialog</Button>

  <Dialog v-model="isOpen">
    <template #header>
      <div class="flex items-center gap-2">
        <span class="text-lg">Custom header</span>
      </div>
    </template>

    <div class="space-y-4">
      <p class="text-sm text-muted">You can fully customize the dialog content using slots.</p>
      <div class="p-4 rounded-lg bg-neutral-soft">
        <p class="text-sm">This is a styled content block inside the dialog body.</p>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between w-full">
        <Button variant="text" @click="isOpen = false">Delete</Button>
        <div class="flex gap-2">
          <Button variant="soft" @click="isOpen = false">Cancel</Button>
          <Button @click="isOpen = false">Save changes</Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>
