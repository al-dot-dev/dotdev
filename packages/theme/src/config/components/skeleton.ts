import { defineComponent } from '@dotdev/design'

export const skeleton = defineComponent({
  ui: 'skeleton',

  semantics: {
    bg: ['neutral-200', 'neutral-700'],
    rounded: '4px',
  },

  rules: {
    '&': 'block w-full skeleton-bg skeleton-rounded',
    '&:not(&--square,&--text)': 'h-4',
    '&--text': `h-[1em] first:mt-[calc((1lh-1em)/2)] last:mb-[calc((1lh-1em)/2)] not-first:my-[calc(1lh-1em)] not-last:my-[calc(1lh-1em)] not-first:last:w-4/5`,
    '&--square': 'aspect-square',
    '&--pulse': 'animate-pulse',
    '&--rounded': 'rounded-full',

    '&__wrapper': 'w-full',
  },
})
