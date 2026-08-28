import { defineComponent } from '@dotdev/design'

export const pagination = defineComponent({
  ui: 'pagination',

  semantics: {
    'bg-item': 'bg-neutral-soft',
    'bg-item-selected': 'bg-neutral-soft-hover',
    'text-default': 'text-muted',
    'text-selected': 'text-foreground',

    'px-sm': 'space-xs',
    'px-md': 'space-sm',
    'px-lg': 'space-md',
    'h-sm': 'size-xs',
    'h-md': 'size-sm',
    'h-lg': 'size-md',
    'gap-sm': 'gap-sm',
    'gap-md': 'gap-md',
    'gap-lg': 'gap-lg',
  },

  utilities: {
    'size-sm': `type-xs`,
    'size-md': `type-sm`,
    'size-lg': `type-sm`,
    'size-item-sm': `pagination-h-sm pagination-px-sm min-w-(--$ns-pagination-h-sm)`,
    'size-item-md': `pagination-h-md pagination-px-md min-w-(--$ns-pagination-h-md)`,
    'size-item-lg': `pagination-h-lg pagination-px-lg min-w-(--$ns-pagination-h-lg)`,

    transition: 'transition-[background-color,color,box-shadow,opacity]',
  },

  rules: {
    '&': `
        inline-flex
        max-w-full
        items-center
        font-medium
        select-none`,

    '&--sm': `
        p-0.5
        gap-0.5
        pagination-size-sm`,

    '&--md': `
        p-0.5
        gap-0.5
        pagination-size-md`,

    '&--lg': `
        p-0.5
        gap-0.5
        pagination-size-lg`,

    '&--disabled': `
        disabled`,

    '&__list': `
        flex
        items-center
        pagination-gap-sm
        min-w-0`,

    '&__item': `
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        radius-sm
        cursor-pointer
        outline-none
        select-none
        pagination-text-default
        pagination-transition`,

    '&__item:hover': `
        pagination-bg-item
        pagination-text-selected`,

    '&__item:focus-visible': `
        ring-1
        ring-inset
        ring-neutral`,

    '&__item:disabled': `
        disabled`,

    '&__item--selected': `
        shadow-xs
        pagination-bg-item-selected
        pagination-text-selected`,

    '&--sm &__item': `
        pagination-size-item-sm`,

    '&--md &__item': `
        pagination-size-item-md`,

    '&--lg &__item': `
        pagination-size-item-lg`,

    '&__ellipsis': `
        flex
        items-center
        justify-center
        pagination-text-default
        pointer-events-none
        select-none`,
  },
})
