import { defineComponent } from '@dotdev/design'

export const icon = defineComponent({
  ui: 'icon',
  rules: {
    '&': `
        size-[1em]
        inline-block`,

    '& svg': `
        size-[1em]`,
  },
})
