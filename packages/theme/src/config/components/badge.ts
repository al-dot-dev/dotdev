import { defineComponent } from '@dotdev/design'

const badgeColors = ['primary', 'neutral', 'danger', 'warning', 'info', 'success'] as const

const badgeColorBase: Record<(typeof badgeColors)[number], string> = {
  primary: 'brand',
  neutral: 'neutral',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

const badgeSemantics = badgeColors.flatMap((color) => {
  const base = badgeColorBase[color]
  return [
    [`bg-${color}-soft`, `bg-${base}-soft`],
    [`text-${color}-soft`, `text-${base}`],
    [`bg-${color}-solid`, `bg-${base}`],
    [`text-${color}-solid`, `text-on-${base}`],
  ]
})

const badgeColorRules = badgeColors.flatMap((color) => [
  [`&--${color}.&--soft`, `badge-bg-${color}-soft badge-text-${color}-soft`],
  [`&--${color}.&--solid`, `badge-bg-${color}-solid badge-text-${color}-solid`],
])

export const badge = defineComponent({
  ui: 'badge',

  semantics: {
    gap: '0.35em',
    px: '0.4em',
    'size-dot': '0.5em',
    ...Object.fromEntries(badgeSemantics),
  },

  rules: {
    '&': `inline-flex items-center justify-center badge-gap rounded-full whitespace-nowrap text-[0.75em] leading-[1.5] font-medium`,
    '&--label': 'badge-px min-w-[1.5em]',
    '&--ring': 'p-1',
    '&__dot': `rounded-full badge-size-dot shrink-0 bg-current`,
    ...Object.fromEntries(badgeColorRules),
  },
})
