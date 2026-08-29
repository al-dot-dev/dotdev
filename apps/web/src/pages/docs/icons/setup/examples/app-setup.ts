import type { Component } from 'vue'
import { createUiKit } from '@dotdev/ui-kit'
import { icons } from './generated/icons'

export const uiKit = createUiKit({
  base: {
    namespace: 'd',
  },
  /* Pass the generated registry so every component resolves icons */
  icons,
})

/* TypeScript knows every name, so typos fail at compile time: */
const icon: Component = icons['magnifying-glass']
