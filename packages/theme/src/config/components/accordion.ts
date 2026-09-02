import { defineComponent } from '@dotdev/design'

export const accordion = defineComponent({
  ui: 'accordion',

  semantics: {
    'bg-item-outlined': 'bg-background',
    'bg-item-soft': 'bg-neutral-soft',
    'border-item': 'border-default',

    'text-item': 'text-foreground',
    'text-value': 'text-foreground',
    'text-indicator': 'text-muted',
    'text-indicator-open': 'text-foreground',
    'ring-focus': 'ring-brand',

    'px-item': 'space-lg',
    'py-item': 'space-md',
    'pb-item': 'space-md',
    'gap-item': 'gap-md',
    'type-item': 'type-sm',
    'rounded-item': 'radius-md',

    gap: 'gap-sm',
  },

  utilities: {
    transition: 'transition-[background-color,color,border-color,opacity]',
    'transition-indicator': 'transition-[transform,rotate,color]',
    'transition-panel': 'transition-[height] duration-200',
  },

  rules: {
    '&': `
        accordion-transition
        flex 
        flex-col 
        w-full`,

    '&--outlined, &--soft': `
        accordion-gap`,

    '&--disabled': `
        disabled`,

    '&__item': `
        flex 
        flex-col 
        rounded-[inherit]`,

    '&--outlined &__item': `
        accordion-rounded-item  
        accordion-border-item 
        accordion-bg-item-outlined
        border`,

    '&--soft &__item': `
        accordion-rounded-item 
        accordion-bg-item-soft`,

    '&--underline &__item': `
        accordion-border-item 
        border-b
        last:border-b-0`,

    '&__trigger': `
        accordion-gap-item
        accordion-px-item
        accordion-py-item
        accordion-type-item
        accordion-text-item
        accordion-transition
        rounded-[inherit]
        flex 
        items-center
        text-left
        font-medium
        outline-none
        cursor-pointer
        select-none`,

    '&__trigger:focus-visible': `
        ring-2
        accordion-ring-focus`,

    '&__trigger:disabled': `
        disabled`,

    '&__indicator': `
        accordion-text-indicator
        ml-auto`,

    '&__indicator-icon': `
        accordion-transition-indicator`,

    '&__trigger--expanded &__indicator': `
        accordion-text-indicator-open`,

    '&__trigger--expanded &__indicator-icon': `
        rotate-180`,

    '&__panel': `
        accordion-transition-panel 
        overflow-hidden`,

    '&__value': `
        accordion-px-item 
        accordion-pb-item 
        accordion-type-item 
        accordion-text-value 
        block`,
  },
})
