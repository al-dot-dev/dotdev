import { createUiKit } from '@dotdev/ui-kit'

export const uiKit = createUiKit({
  base: {
    components: {
      // 2 — config default for every Button
      button: { variant: 'soft' },
    },
  },
})
