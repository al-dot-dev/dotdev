import { defineComponent } from '@dotdev/design'

export const drawer = defineComponent({
  ui: 'drawer',

  semantics: {
    'bg-backdrop': 'bg-backdrop',
    'bg-panel': 'bg-background',
    'border-panel': 'border-default',
    'text-close': 'text-muted',
    'text-close-hover': 'text-foreground',
  },

  utilities: {
    transition: 'transition-[opacity,color]',
  },

  rules: {
    '&': `
        fixed
        inset-0
        z-dialog
        flex
        bg-backdrop`,

    '&--left': `
        items-center
        justify-start`,

    '&--right': `
        items-center
        justify-end`,

    '&--top': `
        items-start
        justify-center`,

    '&--bottom': `
        items-end
        justify-center`,

    '&--left &__panel': `
        border-r
        w-md
        max-w-svw
        h-dvh`,

    '&--right &__panel': `
        border-l
        w-md
        max-w-svw
        h-dvh`,

    '&--top &__panel': `
        border-b
        w-svw
        max-h-dvh`,

    '&--bottom &__panel': `
        border-t
        w-svw
        max-h-dvh`,

    '&__panel': `
        text-foreground
        relative
        z-10
        flex
        flex-col
        drawer-bg-panel
        drawer-border-panel
        shadow-lg
        overflow-hidden`,

    '&__header': `
        flex
        items-center
        justify-between
        px-5
        pt-5`,

    '&__title': `
        type-lg
        font-semibold`,

    '&__body': `
        flex-1
        overflow-y-auto
        p-5`,

    '&__footer': `
        flex
        items-center
        justify-end
        gap-2
        px-5
        pb-5`,

    '&__close': `
        outline-none
        drawer-text-close
        hover:drawer-text-close-hover
        transition-colors
        cursor-pointer
        p-2
        ml-auto
        -mt-2
        -mr-2
        flex
        radius-sm
        hover:bg-neutral-soft
        focus-visible:ring-1
        focus-visible:ring-brand`,

    // animations

    '.drawer-enter-active, .drawer-leave-active': `
        transition-[background-color]
        duration-300`,

    '.drawer-enter-from, .drawer-leave-to': `
        bg-transparent`,

    '.drawer-enter-active &__panel, .drawer-leave-active &__panel': `
        transition-[translate]
        duration-300`,

    '&--left.drawer-enter-from &__panel, &--left.drawer-leave-to &__panel': `
        -translate-x-full`,

    '&--right.drawer-enter-from &__panel, &--right.drawer-leave-to &__panel': `
        translate-x-full`,

    '&--top.drawer-enter-from &__panel, &--top.drawer-leave-to &__panel': `
        -translate-y-full`,

    '&--bottom.drawer-enter-from &__panel, &--bottom.drawer-leave-to &__panel': `
        translate-y-full`,
  },
})
