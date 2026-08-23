import { defineTheme } from '@dotdev/design'
import { button } from './components/button.ts'
import { accordion } from './components/accordion.ts'
import { avatar } from './components/avatar.ts'
import { breadcrumbs } from './components/breadcrumbs.ts'
import { checkbox } from './components/checkbox.ts'
import { divider } from './components/divider.ts'
import { group } from './components/group.ts'
import { iconButton } from './components/icon-button.ts'
import { icon } from './components/icon.ts'
import { input } from './components/input.ts'
import { listbox } from './components/listbox.ts'
import { menu } from './components/menu.ts'
import { message } from './components/message.ts'
import { radio } from './components/radio.ts'
import { scrollArea } from './components/scroll-area.ts'
import { selectButton } from './components/select-button.ts'
import { select } from './components/select.ts'
import { switchComponent } from './components/switch.ts'
import { table } from './components/table.ts'
import { tag } from './components/tag.ts'
import { textarea } from './components/textarea.ts'
import { skeleton } from './components/skeleton.ts'
import { progress } from './components/progress.ts'
import { pagination } from './components/pagination.ts'
import { layout } from './components/layout.ts'
import { tabs } from './components/tabs.ts'

const sizeKeys = ['h', 'size']
const spaceKeys = ['px', 'py', 'p', 'pl', 'pr', 'pt', 'pb']

export const themeConfig = defineTheme({
  primitives: {
    'brand-50': 'oklch(96.2% 0.018 272.314)',
    'brand-100': 'oklch(93% 0.034 272.788)',
    'brand-200': 'oklch(87% 0.065 274.039)',
    'brand-300': 'oklch(78.5% 0.115 274.713)',
    'brand-400': 'oklch(67.3% 0.182 276.935)',
    'brand-500': 'oklch(58.5% 0.233 277.117)',
    'brand-600': 'oklch(51.1% 0.262 276.966)',
    'brand-700': 'oklch(45.7% 0.24 277.023)',
    'brand-800': 'oklch(39.8% 0.195 277.366)',
    'brand-900': 'oklch(35.9% 0.144 278.697)',
    'brand-950': 'oklch(25.7% 0.09 281.288)',

    'neutral-50': 'oklch(95.58% 0.007 277.16)',
    'neutral-100': 'oklch(91.19% 0.014 281.55)',
    'neutral-200': 'oklch(82.14% 0.03 279.26)',
    'neutral-300': 'oklch(72.91% 0.045 279.43)',
    'neutral-400': 'oklch(63.44% 0.062 279.07)',
    'neutral-500': 'oklch(53.68% 0.082 277.4)',
    'neutral-600': 'oklch(45.93% 0.067 278.07)',
    'neutral-700': 'oklch(37.8% 0.053 277.88)',
    'neutral-800': 'oklch(29.2% 0.039 277.47)',
    'neutral-900': 'oklch(19.96% 0.02 279.96)',
    'neutral-950': 'oklch(17.08% 0.015 278.37)',

    'danger-50': 'oklch(97.1% 0.013 17.38)',
    'danger-100': 'oklch(93.6% 0.032 17.717)',
    'danger-200': 'oklch(88.5% 0.062 18.334)',
    'danger-300': 'oklch(80.8% 0.114 19.571)',
    'danger-400': 'oklch(70.4% 0.191 22.216)',
    'danger-500': 'oklch(63.7% 0.237 25.331)',
    'danger-600': 'oklch(57.7% 0.245 27.325)',
    'danger-700': 'oklch(50.5% 0.213 27.518)',
    'danger-800': 'oklch(44.4% 0.177 26.899)',
    'danger-900': 'oklch(39.6% 0.141 25.723)',
    'danger-950': 'oklch(25.8% 0.092 26.042)',

    'warning-50': 'oklch(98.7% 0.022 95.277)',
    'warning-100': 'oklch(96.2% 0.059 95.617)',
    'warning-200': 'oklch(92.4% 0.12 95.746)',
    'warning-300': 'oklch(87.9% 0.169 91.605)',
    'warning-400': 'oklch(82.8% 0.189 84.429)',
    'warning-500': 'oklch(76.9% 0.188 70.08)',
    'warning-600': 'oklch(66.6% 0.179 58.318)',
    'warning-700': 'oklch(55.5% 0.163 48.998)',
    'warning-800': 'oklch(47.3% 0.137 46.201)',
    'warning-900': 'oklch(41.4% 0.112 45.904)',
    'warning-950': 'oklch(27.9% 0.077 45.635)',

    'info-50': 'oklch(97.7% 0.013 236.62)',
    'info-100': 'oklch(95.1% 0.026 236.824)',
    'info-200': 'oklch(90.1% 0.058 230.902)',
    'info-300': 'oklch(82.8% 0.111 230.318)',
    'info-400': 'oklch(74.6% 0.16 232.661)',
    'info-500': 'oklch(68.5% 0.169 237.323)',
    'info-600': 'oklch(58.8% 0.158 241.966)',
    'info-700': 'oklch(50% 0.134 242.749)',
    'info-800': 'oklch(44.3% 0.11 240.79)',
    'info-900': 'oklch(39.1% 0.09 240.876)',
    'info-950': 'oklch(29.3% 0.066 243.157)',

    'success-50': 'oklch(97.9% 0.021 166.113)',
    'success-100': 'oklch(95% 0.052 163.051)',
    'success-200': 'oklch(90.5% 0.093 164.15)',
    'success-300': 'oklch(84.5% 0.143 164.978)',
    'success-400': 'oklch(76.5% 0.177 163.223)',
    'success-500': 'oklch(69.6% 0.17 162.48)',
    'success-600': 'oklch(59.6% 0.145 163.225)',
    'success-700': 'oklch(50.8% 0.118 165.612)',
    'success-800': 'oklch(43.2% 0.095 166.913)',
    'success-900': 'oklch(37.8% 0.077 168.94)',
    'success-950': 'oklch(26.2% 0.051 172.552)',

    'space-xs': '0.5rem',
    'space-sm': '0.625rem',
    'space-md': '0.75rem',
    'space-lg': '1rem',
    'space-xl': '1.25rem',

    'radius-xs': '0.125rem',
    'radius-sm': '0.375rem',
    'radius-md': '0.5rem',
    'radius-lg': '0.75rem',
    'radius-xl': '1rem',

    'size-xs': '2rem',
    'size-sm': '2.25rem',
    'size-md': '2.5rem',
    'size-lg': '2.75rem',
    'size-xl': '3rem',

    'gap-xs': '0.25rem',
    'gap-sm': '0.375rem',
    'gap-md': '0.5rem',
    'gap-lg': '0.625rem',
    'gap-xl': '0.75rem',

    'type-xs': '0.75rem',
    'type-sm': '0.875rem',
    'type-md': '1rem',
    'type-lg': '1.125rem',
    'type-xl': '1.25rem',

    white: '#ffffff',
    black: '#000000',
  },
  semantics: {
    'bg-background': ['white', 'neutral-950'],
    'bg-surface': ['white', 'neutral-950'],
    'text-foreground': ['neutral-900', 'neutral-100'],
    'text-muted': ['neutral-500', 'neutral-400'],
    'border-default': ['neutral-100', 'neutral-800'],
    'text-placeholder': ['neutral-400', 'neutral-600'],

    /* Brand */
    'bg-brand': ['brand-500', 'brand-400'],
    'bg-brand-hover': ['brand-600', 'brand-300'],
    'text-brand': ['brand-600', 'brand-400'],
    'text-on-brand': ['neutral-50', 'neutral-950'],
    'bg-brand-soft': ['brand-50', 'brand-500/16'],
    'bg-brand-soft-hover': ['brand-100', 'brand-500/26'],
    'border-brand': ['brand-500', 'brand-400'],
    'border-brand-soft': 'brand-500/26',
    'ring-brand': 'brand-500/50',

    /* Neutral */
    'bg-neutral': ['neutral-800', 'neutral-200'],
    'bg-neutral-hover': ['neutral-700', 'neutral-300'],
    'text-neutral': ['neutral-700', 'neutral-300'],
    'text-on-neutral': ['neutral-50', 'neutral-900'],
    'bg-neutral-soft': ['neutral-50', 'neutral-500/16'],
    'bg-neutral-soft-hover': ['neutral-100', 'neutral-500/26'],
    'border-neutral': ['neutral-200', 'neutral-700'],
    'ring-neutral': 'neutral-500/50',

    /* Danger */
    'bg-danger': ['danger-600', 'danger-400'],
    'bg-danger-hover': ['danger-700', 'danger-300'],
    'text-danger': ['danger-600', 'danger-400'],
    'text-on-danger': ['neutral-50', 'neutral-950'],
    'bg-danger-soft': ['danger-50', 'danger-500/16'],
    'bg-danger-soft-hover': ['danger-100', 'danger-500/26'],
    'border-danger': ['danger-500', 'danger-400'],
    'ring-danger': 'danger-500/50',

    /* Warning */
    'bg-warning': ['warning-500', 'warning-400'],
    'bg-warning-hover': ['warning-600', 'warning-300'],
    'text-warning': ['warning-700', 'warning-400'],
    'text-on-warning': ['neutral-950', 'neutral-950'],
    'bg-warning-soft': ['warning-50', 'warning-500/16'],
    'bg-warning-soft-hover': ['warning-100', 'warning-500/26'],
    'border-warning': ['warning-600', 'warning-400'],
    'ring-warning': 'warning-500/50',

    /* Info */
    'bg-info': ['info-700', 'info-400'],
    'bg-info-hover': ['info-800', 'info-300'],
    'text-info': ['info-700', 'info-400'],
    'text-on-info': ['neutral-50', 'neutral-950'],
    'bg-info-soft': ['info-50', 'info-500/16'],
    'bg-info-soft-hover': ['info-100', 'info-500/26'],
    'border-info': ['info-600', 'info-400'],
    'ring-info': 'info-500/50',

    /* Success */
    'bg-success': ['success-700', 'success-400'],
    'bg-success-hover': ['success-800', 'success-300'],
    'text-success': ['success-700', 'success-400'],
    'text-on-success': ['neutral-50', 'neutral-950'],
    'bg-success-soft': ['success-50', 'success-500/16'],
    'bg-success-soft-hover': ['success-100', 'success-500/26'],
    'border-success': ['success-600', 'success-400'],
    'ring-success': 'success-500/50',
  },
  utilities: {
    'type-*': 'text-[length:--value([*])]',

    ...flatMapObject(sizeKeys, (key) => ({
      [`${key}-xs`]: `${key}-(--$ns-size-xs)`,
      [`${key}-sm`]: `${key}-(--$ns-size-sm)`,
      [`${key}-md`]: `${key}-(--$ns-size-md)`,
      [`${key}-lg`]: `${key}-(--$ns-size-lg)`,
      [`${key}-xl`]: `${key}-(--$ns-size-xl)`,
    })),

    ...flatMapObject(spaceKeys, (key) => ({
      [`${key}-xs`]: `${key}-(--$ns-space-xs)`,
      [`${key}-sm`]: `${key}-(--$ns-space-sm)`,
      [`${key}-md`]: `${key}-(--$ns-space-md)`,
      [`${key}-lg`]: `${key}-(--$ns-space-lg)`,
      [`${key}-xl`]: `${key}-(--$ns-space-xl)`,
    })),

    'gap-xs': 'gap-(--$ns-gap-xs)',
    'gap-sm': 'gap-(--$ns-gap-sm)',
    'gap-md': 'gap-(--$ns-gap-md)',
    'gap-lg': 'gap-(--$ns-gap-lg)',
    'gap-xl': 'gap-(--$ns-gap-xl)',

    'type-xs': 'text-(length:--$ns-type-xs)',
    'type-sm': 'text-(length:--$ns-type-sm)',
    'type-md': 'text-(length:--$ns-type-md)',
    'type-lg': 'text-(length:--$ns-type-lg)',
    'type-xl': 'text-(length:--$ns-type-xl)',

    'radius-xs': 'rounded-(--$ns-radius-xs)',
    'radius-sm': 'rounded-(--$ns-radius-sm)',
    'radius-md': 'rounded-(--$ns-radius-md)',
    'radius-lg': 'rounded-(--$ns-radius-lg)',
    'radius-xl': 'rounded-(--$ns-radius-xl)',

    disabled: 'pointer-events-none opacity-60',
  },
})

export default defineTheme({
  name: 'Default',
  ...themeConfig,
  components: {
    // ui-kit
    button,
    accordion,
    avatar,
    breadcrumbs,
    checkbox,
    divider,
    group,
    iconButton,
    icon,
    input,
    listbox,
    menu,
    message,
    radio,
    scrollArea,
    selectButton,
    select,
    switchComponent,
    table,
    tag,
    textarea,
    skeleton,
    progress,
    pagination,
    layout,
    tabs,
  },
})

function flatMapObject<TKey extends PropertyKey, TValue>(
  keys: readonly TKey[],
  callback: (key: TKey) => Record<string, TValue>,
): Record<string, TValue> {
  return Object.assign({}, ...keys.map(callback))
}
