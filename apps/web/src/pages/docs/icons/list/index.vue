<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Badge, Group, GroupAddon, Icon, Input, type UiKitIcon, useClipboard } from '@dotdev/ui-kit'
import { icons } from '../../../../generated/icons'
import { defineDocPage, DocPage } from '@dotdev/studio'

defineDocPage({
  title: 'Icons list',
  icon: 'eye-open',
  description: `<code>@dotdev/icons</code> — one stroke, one weight, for every control in the workbench. Search by name and click any tile to copy its registry key, then render it with <code>&lt;Icon name="..." /&gt;</code>.`,
})

const allIcons = Object.keys(icons) as UiKitIcon[]

const query = ref('')
const normalized = computed(() => query.value.trim().toLowerCase())
const filtered = computed(() =>
  normalized.value ? allIcons.filter((name) => name.includes(normalized.value)) : allIcons,
)

const { copy } = useClipboard()
const copiedKey = ref<UiKitIcon | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

function copyName(name: UiKitIcon) {
  if (!copy(name)) return

  copiedKey.value = name

  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copiedKey.value = null), 1500)
}
</script>

<template>
  <DocPage>
    <div class="flex items-center justify-between mb-8">
      <Group>
        <GroupAddon attach variant="plain">
          <Icon name="magnifying-glass" />
        </GroupAddon>

        <Input v-model="query" class="pl-9" placeholder="Filter icons…" />
      </Group>

      <Badge class="text-sm font-mono" color="neutral">
        {{ filtered.length }}{{ filtered.length !== allIcons.length ? ` / ${allIcons.length}` : ` total` }}
      </Badge>
    </div>

    <div id="icons" class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <button
        v-for="name in filtered"
        :key="name"
        class="group relative flex flex-col overflow-hidden rounded-lg border border-default bg-surface text-left transition-[border-color,background-color] hover:border-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        type="button"
        @click="copyName(name)"
      >
        <span class="relative flex h-16 items-center justify-center border-b border-default bg-background">
          <Icon
            :name="name"
            class="text-[1.375rem] text-foreground transition-transform duration-150 group-hover:-translate-y-0.5"
          />

          <span
            v-if="copiedKey === name"
            aria-hidden="true"
            class="absolute inset-0 flex items-center justify-center gap-1 bg-brand-soft font-mono text-[0.6875rem] uppercase tracking-widest text-brand"
          >
            <Icon class="text-sm" name="check" />
            copied
          </span>
        </span>

        <span
          class="truncate px-2 py-2 text-center font-mono text-[0.6875rem] leading-[1.1] text-muted transition-colors group-hover:text-foreground"
        >
          {{ name }}
        </span>
      </button>
    </div>

    <div
      v-if="!filtered.length"
      class="mt-10 flex flex-col items-center gap-1 rounded-xl border border-dashed border-default px-4 py-12 text-center"
    >
      <Icon class="mb-2 size-6 text-muted" name="magnifying-glass" />
      <p class="font-semibold text-foreground">No icons match “{{ query }}”</p>
      <p class="text-sm text-muted">Check the spelling or try a shorter term.</p>
      <button
        class="mt-3 text-sm font-medium text-brand underline decoration-auto underline-offset-3 transition-opacity hover:opacity-80"
        type="button"
        @click="query = ''"
      >
        Clear filter
      </button>
    </div>
  </DocPage>
</template>
