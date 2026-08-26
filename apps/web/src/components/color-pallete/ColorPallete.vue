<script lang="ts" setup>
import { Floating, IconButton, updateThemeConfig } from '@dotdev/ui-kit'
import { reactive } from 'vue'
import { brandColors, neutrals, type Palette } from './palettes.ts'
import PaletteGroup from './PaletteGroup.vue'

const active = reactive({
  brand: brandColors.find((p) => p.name === 'Indigo')!,
  neutral: neutrals.find((p) => p.name === 'Graphite')!,
})

function select(group: 'brand' | 'neutral', palette: Palette) {
  active[group] = palette

  updateThemeConfig({
    namespace: 'd',
    primitives: {
      ...active.brand.colors,
      ...active.neutral.colors,
    },
  })
}
</script>

<template>
  <Floating #default="{ isOpen, ref, style, toggle }" :offset="0" placement="bottom-end" strategy="fixed">
    <IconButton class="text-muted" icon="color-wheel" @click="toggle" />

    <Teleport to="body">
      <div
        v-if="isOpen"
        :ref="ref"
        :style="style"
        class="w-72 z-dialog rounded-xl border border-default bg-surface shadow-lg"
      >
        <div class="max-h-80 overflow-y-auto p-1 flex flex-col gap-0.5">
          <PaletteGroup
            :active="active.brand"
            :palettes="brandColors"
            label="Brand"
            @select="select('brand', $event)"
          />

          <div class="mx-2 my-1 border-t border-default" />

          <PaletteGroup
            :active="active.neutral"
            :palettes="neutrals"
            label="Neutral"
            @select="select('neutral', $event)"
          />
        </div>
      </div>
    </Teleport>
  </Floating>
</template>
