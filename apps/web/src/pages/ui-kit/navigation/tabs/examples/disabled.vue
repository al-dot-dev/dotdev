<script lang="ts" setup>
import { Tabs } from '@dotdev/ui-kit'
import { ref } from 'vue'

interface Plan {
  id: string
  name: string
}

const plans: Plan[] = [
  { id: 'free', name: 'Free' },
  { id: 'pro', name: 'Pro' },
  { id: 'team', name: 'Team' },
  { id: 'legacy', name: 'Legacy' },
]

const selected = ref<Plan>(plans[0])
</script>

<template>
  <div class="w-96">
    <Tabs
      v-model="selected"
      :options="plans"
      :option-disabled="(plan) => plan.id === 'legacy'"
      label-key="name"
      value-key="id"
    >
      <template #panel="{ option }">
        <p class="bg-surface rounded-lg p-4 text-sm text-muted">
          Comparing the {{ option.name }} plan.
        </p>
      </template>
    </Tabs>

    <p class="mt-2 font-mono text-xs text-muted">model.value.id: {{ selected.id }}</p>
  </div>
</template>
