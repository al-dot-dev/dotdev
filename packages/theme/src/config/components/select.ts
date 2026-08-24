import { defineComponent } from '@dotdev/design'

export const select = defineComponent({
  ui: 'select',
  semantics: {
    'bg-soft': 'bg-neutral-soft',
    'bg-outlined': 'bg-background',
    'border-outlined': 'border-neutral',
    'border-focus': 'border-brand',
    'border-invalid': 'border-danger',
    'text-default': 'text-foreground',
    'text-placeholder': 'text-placeholder',

    'pl-sm': 'space-sm',
    'pl-md': 'space-md',
    'pl-lg': 'space-lg',
    'h-sm': 'size-sm',
    'h-md': 'size-md',
    'h-lg': 'size-lg',
    'type-sm': 'type-sm',
    'type-md': 'type-md',
    'type-lg': 'type-md',

    rounded: 'radius-md',
  },
  utilities: {
    'size-sm': 'select-type-sm select-h-sm select-pl-sm',
    'size-md': 'select-type-md select-h-md select-pl-md',
    'size-lg': 'select-type-lg select-h-lg select-pl-lg',
    transition: 'transition-[background-color,opacity,border,color]',
  },
  rules: {
    '&': 'select-transition flex items-center min-w-50 outline-none',

    '&__label': 'select-text-default whitespace-nowrap truncate outline-none',
    '&__label--placeholder': 'select-text-placeholder',
    '&__dropdown': `flex items-center justify-center h-full aspect-square text-muted ml-auto pointer-events-none`,

    '&--outlined, &--underlined': 'select-border-outlined',
    '&--outlined, &--soft': 'select-rounded',
    '&--outlined': 'select-bg-outlined border',
    '&--underlined': 'border-b',
    '&--soft': 'select-bg-soft border border-transparent',

    '&--disabled': 'disabled',
    '&--focused': 'select-border-focus',
    '&--invalid': 'select-border-invalid',
    '&--invalid:focus-visible': 'select-border-invalid',

    '&--sm': 'select-size-sm',
    '&--md': 'select-size-md',
    '&--lg': 'select-size-lg',
  },
})
