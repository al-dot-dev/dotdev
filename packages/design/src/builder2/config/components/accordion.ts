export const accordion = {
  ui: 'accordion',
  tokens: {
    'padding-bottom': '--$ns-space-x',
  },
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

    focus: {
      ring: 'ring-brand',
    },

    value: {
      text: 'text-foreground',
    },

    indicator: {
      text: 'text-muted',
      open: {
        text: 'text-foreground',
      },
    },

    item: {
      px: 'space-lg',
      py: 'space-md',
      pb: 'space-md',
      gap: 'gap-md',
      type: 'type-sm',
      rounded: 'radius-md',
      border: 'border-default',
      text: 'text-foreground',
      outlined: {
        bg: 'bg-background',
      },
      soft: {
        bg: 'bg-neutral-soft',
      },
    },
  } as any,

  utilities: {
    'item-size': '&-item-px &-item-py &-item-pb',
    transition: 'transition-[background-color,color,border-color,opacity]',
    'transition-indicator': 'transition-[transform,rotate,color]',
    'transition-panel': 'transition-[height] duration-200',
  },

  rules: {
    '&': `
        &-transition
        flex 
        flex-col 
        w-full`,

    '&--outlined, &--soft': `
        &-gap`,

    '&--disabled': `
        disabled`,

    '&__item': `
        flex 
        flex-col 
        rounded-[inherit]`,

    '&--outlined &__item': `
        &-rounded-item  
        &-border-item 
        &-bg-item-outlined
        border`,

    '&--soft &__item': `
        &-rounded-item 
        &-bg-item-soft`,

    '&--underline &__item': `
        &-border-item 
        border-b
        last:border-b-0`,

    '&__trigger': `
        &-gap-item
        &-px-item
        &-py-item
        &-type-item
        &-text-item
        &-transition
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
        &-ring-focus`,

    '&__trigger:disabled': `
        disabled`,

    '&__indicator': `
        &-text-indicator
        ml-auto`,

    '&__indicator-icon': `
        &-transition-indicator`,

    '&__trigger--expanded &__indicator': `
        &-text-indicator-open`,

    '&__trigger--expanded &__indicator-icon': `
        rotate-180`,

    '&__panel': `
        &-transition-panel 
        overflow-hidden`,

    '&__value': `
        &-px-item 
        &-pb-item 
        &-type-item 
        &-text-value 
        block`,
  },
}
