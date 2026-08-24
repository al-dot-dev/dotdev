<script lang="ts" setup>
import { IconButton, Layout, LayoutContent, LayoutHeader, LayoutSidebar } from '@dotdev/ui-kit'

definePage({ name: 'Base layout' })

const navItems = ['Getting started', 'Theming', 'Components', 'Hooks', 'Migration']
</script>

<template>
  <Layout #default="{ toggleSidebar, sidebarMode }">
    <LayoutSidebar>
      <template #header>
        <span class="font-bold tracking-tight">dotdev</span>
        <IconButton v-if="sidebarMode === 'mobile'" class="ml-auto" icon="cross-1" @click="toggleSidebar" />
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

    <Layout>
      <LayoutHeader>
        <IconButton icon="hamburger-menu" @click="toggleSidebar" />
      </LayoutHeader>

      <LayoutContent>
        <div class="flex flex-1 flex-col gap-4 p-6">
          <div class="overflow-auto">
            <div class="bg-surface h-32 rounded-lg border border-default w-[200vw]" />
          </div>
          <div class="bg-surface h-32 rounded-lg border border-default" />
          <div class="grid grid-cols-3 gap-4">
            <div v-for="n in 3" :key="n" class="bg-surface h-24 rounded-lg border border-default" />
          </div>
          <div class="bg-surface h-[200vh] rounded-lg border border-default" />
        </div>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
