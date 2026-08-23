import { defineComponent } from '@dotdev/design'

export const tabs = defineComponent({
  ui: 'tabs',

  semantics: {
    'border-default': 'border-neutral',
    'border-selected': 'border-brand',
    'border-outlined': 'border-neutral',

    'bg-soft': 'bg-neutral-soft',
    'bg-outlined': 'bg-background',
    'bg-item': ['white', 'neutral-800'],

    'text-default': 'text-muted',
    'text-selected': 'text-foreground',

    'px-sm': 'space-sm',
    'px-md': 'space-md',
    'px-lg': 'space-lg',
    'h-sm': 'size-sm',
    'h-md': 'size-md',
    'h-lg': 'size-lg',
    'gap-sm': 'gap-sm',
    'gap-md': 'gap-md',
    'gap-lg': 'gap-lg',
  },

  utilities: {
    'size-sm': `type-sm tabs-h-sm`,
    'size-md': `type-sm tabs-h-md`,
    'size-lg': `type-md tabs-h-lg`,
    'size-item-sm': `tabs-px-sm tabs-gap-sm`,
    'size-item-md': `tabs-px-md tabs-gap-md`,
    'size-item-lg': `tabs-px-lg tabs-gap-lg`,

    transition: 'transition-[background-color,color,border-color,box-shadow]',
  },

  rules: {
    '&': `flex w-fit min-w-0 max-w-full flex-col gap-md`,

    '&__list': `flex max-w-full items-center tabs-transition`,
    '&__item': `inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap bg-transparent font-medium outline-none tabs-text-default tabs-transition`,
    '&__item:hover': `tabs-text-selected`,
    '&__item:focus-visible': `ring-1 ring-inset ring-brand radius-sm`,
    '&__item:disabled': `disabled cursor-not-allowed`,
    '&__item--selected': `tabs-text-selected`,

    /* underlined */
    '&--underlined &__list': `gap-lg border-b tabs-border-default`,
    '&--underlined &__item': `-mb-px border-b-2 border-transparent`,
    '&--underlined &__item--selected': `tabs-border-selected`,

    /* segmented */
    '&--soft &__list': `radius-md p-0.5 gap-0.5 tabs-bg-soft`,
    '&--outlined &__list': `radius-md p-0.5 gap-0.5 border tabs-border-outlined tabs-bg-outlined`,
    '&--soft &__item, &--outlined &__item': `radius-sm`,
    '&--soft &__item--selected': `shadow-xs tabs-bg-item`,
    '&--outlined &__item--selected': `tabs-bg-item`,

    /* sizes */
    '&--sm &__item': `tabs-size-sm tabs-size-item-sm`,
    '&--md &__item': `tabs-size-md tabs-size-item-md`,
    '&--lg &__item': `tabs-size-lg tabs-size-item-lg`,
  },
})
