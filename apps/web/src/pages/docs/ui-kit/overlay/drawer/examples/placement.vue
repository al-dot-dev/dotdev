<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Drawer } from '@dotdev/ui-kit'
import type { UIDrawerPlacement } from '@dotdev/ui-kit'

const isOpen = ref(false)
const placement = ref<UIDrawerPlacement>('left')

const placements: UIDrawerPlacement[] = ['left', 'right', 'top', 'bottom']

function openDrawer(pos: UIDrawerPlacement) {
  placement.value = pos
  isOpen.value = true
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button v-for="pos in placements" :key="pos" variant="soft" @click="openDrawer(pos)">
      {{ pos }}
    </Button>
  </div>

  <Drawer v-model="isOpen" :placement="placement" :title="placement">
    <p class="text-sm text-muted">This drawer slides in from the <strong>{{ placement }}</strong>.</p>

    <template #footer>
      <Button @click="isOpen = false">Close</Button>
    </template>
  </Drawer>
</template>
