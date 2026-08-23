<script lang="ts" setup>
import { Layout, LayoutHeader, LayoutSidebar } from '@dotdev/ui-kit'

definePage({ name: 'Base layout' })

const navItems = ['Getting started', 'Theming', 'Components', 'Hooks', 'Migration']
</script>

<template>
  <div class="p-6">
    <Layout class="h-140 min-h-0 overflow-hidden rounded-lg border">
      <LayoutSidebar class="static h-full max-h-full">
        <template #header>
          <span class="font-bold tracking-tight">dotdev</span>
        </template>

        <nav class="flex flex-col gap-1">
          <span
            v-for="item in navItems"
            :key="item"
            class="type-sm rounded-md px-2 py-1.5 text-muted hover:bg-neutral-soft-hover hover:text-foreground"
          >
            {{ item }}
          </span>
        </nav>

        <template #footer>
          <span class="type-xs text-muted">v0.1.0</span>
        </template>
      </LayoutSidebar>

      <template #body>
        <LayoutHeader>
          <span class="type-sm font-semibold">Overview</span>
          <span class="type-sm text-muted">A shell made of Layout, LayoutSidebar and LayoutHeader.</span>
        </LayoutHeader>

        <main class="flex flex-1 flex-col gap-4 p-6">
          <div class="bg-surface h-32 rounded-lg border" />
          <div class="grid grid-cols-3 gap-4">
            <div v-for="n in 3" :key="n" class="bg-surface h-24 rounded-lg border" />
          </div>
          <div class="bg-surface flex-1 rounded-lg border" />
        </main>
      </template>
    </Layout>
  </div>
</template>
