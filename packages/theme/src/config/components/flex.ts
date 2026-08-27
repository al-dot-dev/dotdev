import { defineComponent } from '@dotdev/design'

const flexDirections = ['row', 'column', 'row-reverse', 'column-reverse'] as const
const flexAligns = ['start', 'end', 'center', 'stretch', 'baseline'] as const
const flexJustifies = ['start', 'end', 'center', 'between', 'around', 'evenly'] as const
const flexWraps = ['wrap', 'nowrap', 'wrap-reverse'] as const
const flexGaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const alignMap: Record<(typeof flexAligns)[number], string> = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
}

const justifyMap: Record<(typeof flexJustifies)[number], string> = {
  start: 'start',
  end: 'end',
  center: 'center',
  between: 'between',
  around: 'around',
  evenly: 'evenly',
}

const flexRules = [
  ...flexDirections.map((d) => [`&--${d}`, `flex-${d}`]),
  ...flexAligns.map((a) => [`&--align-${a}`, `items-${alignMap[a]}`]),
  ...flexJustifies.map((j) => [`&--justify-${j}`, `justify-${justifyMap[j]}`]),
  ...flexWraps.map((w) => [`&--${w}`, `flex-${w}`]),
  ...flexGaps.map((g) => [`&--gap-${g}`, `gap-${g}`]),
]

export const flex = defineComponent({
  ui: 'flex',
  rules: {
    '&': 'flex',
    '&--inline': 'inline-flex',
    ...Object.fromEntries(flexRules),
  },
})
