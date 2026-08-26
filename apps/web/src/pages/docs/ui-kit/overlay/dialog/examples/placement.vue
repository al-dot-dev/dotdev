<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Dialog } from '@dotdev/ui-kit'
import type { UIDialogPlacement } from '@dotdev/ui-kit'

const isOpen = ref(false)
const placement = ref<UIDialogPlacement>('center')

const placements: UIDialogPlacement[] = [
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const

function openDialog(pos: UIDialogPlacement) {
  placement.value = pos
  isOpen.value = true
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button v-for="pos in placements" :key="pos" variant="soft" @click="openDialog(pos)">
      {{ pos }}
    </Button>
  </div>

  <Dialog v-model="isOpen" :placement="placement" :title="placement">
    <p class="text-sm text-muted">This dialog is positioned at <strong>{{ placement }}</strong>.</p>

    <template #footer>
      <Button @click="isOpen = false">Close</Button>
    </template>
  </Dialog>
</template>
