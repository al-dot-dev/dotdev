import { createUiKit } from '@dotdev/ui-kit'

export const uiKit = createUiKit({
  base: {
    components: {
      button: { size: 'lg', variant: 'soft' },
      input: { variant: 'soft' },
      tag: { rounded: true },
    },
  },
})
