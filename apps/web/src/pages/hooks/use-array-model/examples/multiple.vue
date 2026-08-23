<script lang="ts" setup>
import { useArrayModel } from '@dotdev/ui-kit'
import { ref } from 'vue'

const tags = ['vue', 'typescript', 'vite', 'tailwind', 'testing']

const model = ref<string[]>(['vue', 'vite'])

const { isSelected, toggle } = useArrayModel(model, { multiple: true })
</script>

<template>
  <div>
    <div class="flex max-w-72 flex-wrap gap-1.5">
      <button
        v-for="tag in tags"
        :key="tag"
        :class="isSelected(tag) ? 'bg-brand text-on-brand' : 'bg-neutral-soft text-muted'"
        class="rounded-full px-3 py-1 text-xs font-medium"
        @click="toggle(tag)"
      >
        #{{ tag }}
      </button>
    </div>

    <p class="mt-2 font-mono text-xs text-muted">model: [{{ model.join(', ') }}]</p>
  </div>
</template>
