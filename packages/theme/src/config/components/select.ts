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

    'gap-sm': 'gap-sm',
    'gap-md': 'gap-md',
    'gap-lg': 'gap-lg',

    rounded: 'radius-md',
  },
  utilities: {
    'size-sm': 'select-type-sm select-h-sm select-pl-sm select-gap-sm',
    'size-md': 'select-type-md select-h-md select-pl-md select-gap-md',
    'size-lg': 'select-type-lg select-h-lg select-pl-lg select-gap-lg',
    transition: 'transition-[background-color,opacity,border,color]',
  },
  rules: {
    '&': 'select-transition flex min-w-50 outline-none',

    '&__label': 'select-text-default outline-none h-full w-full flex items-center',
    '&__label--placeholder': 'select-text-placeholder',
    '&__dropdown': `flex items-center justify-center aspect-square text-muted`,

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
