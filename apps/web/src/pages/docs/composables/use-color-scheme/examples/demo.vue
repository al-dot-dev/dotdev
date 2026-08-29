<script lang="ts" setup>
import { useColorScheme } from '@dotdev/ui-kit'
import { ref } from 'vue'

const schemes = ['light', 'dark', 'auto'] as const

const target = ref<HTMLElement | null>(null)

const { scheme } = useColorScheme({ target })
</script>

<template>
  <div>
    <div class="mb-2 flex gap-1.5">
      <button
        v-for="value in schemes"
        :key="value"
        :class="scheme === value ? 'bg-brand text-on-brand' : 'bg-neutral-soft text-muted'"
        class="rounded-lg px-3 py-1.5 text-xs font-medium capitalize"
        @click="scheme = value"
      >
        {{ value }}
      </button>
    </div>

    <div ref="target" class="rounded-xl border border-default bg-background p-4 transition-colors">
      <p class="text-sm font-medium text-foreground">Themed preview</p>
      <p class="mt-1 text-xs text-muted">
        The dark class is toggled on this element instead of &lt;html&gt;. The chosen scheme is stored in
        localStorage and shared across the app.
      </p>
    </div>
  </div>
</template>
