<script lang="ts" setup>
import {
  Breadcrumbs,
  IconButton,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSidebar,
  useColorScheme,
  useRouterBreadcrumbs,
} from '@dotdev/ui-kit'
import Logo from '../components/Logo.vue'
import SidebarMenu from '../components/SidebarMenu.vue'
import { ColorPallete } from '../components/color-pallete'

const { scheme } = useColorScheme()

const { items } = useRouterBreadcrumbs({
  label: (record) => record.children[0]?.name,
  skip: (record) => !!record.name,
})
</script>

<template>
  <Layout #default="{ toggleSidebar, isMobile }">
    <LayoutSidebar>
      <template #header>
        <Logo />
        <IconButton v-if="isMobile" class="ml-auto" icon="cross-1" @click="toggleSidebar" />
      </template>

      <SidebarMenu :items="$studioMenu" @select="isMobile && toggleSidebar()" />

      <template #footer>
        <span class="app-version">v0.1.0</span>
        <IconButton aria-label="GitHub repository" class="text-muted" icon="github-logo" />
      </template>
    </LayoutSidebar>

    <Layout>
      <LayoutHeader>
        <template #left>
          <IconButton aria-label="Toggle sidebar" icon="hamburger-menu" size="sm" @click="toggleSidebar" />
          <Logo v-if="isMobile" />
          <Breadcrumbs v-if="items.length && !isMobile" :items="items" class="text-sm" separatorIcon="chevron-right" />
        </template>

        <template #right>
          <ColorPallete />
          <IconButton
            :icon="scheme === 'light' ? 'moon' : 'sun'"
            aria-label="Toggle color scheme"
            class="text-muted"
            size="sm"
            @click="scheme = scheme === 'dark' ? 'light' : 'dark'"
          />
        </template>
      </LayoutHeader>

      <LayoutContent>
        <RouterView />
      </LayoutContent>
    </Layout>
  </Layout>
</template>
