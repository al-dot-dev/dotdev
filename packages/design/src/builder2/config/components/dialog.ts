import { defineComponent } from '@dotdev/design'

export const dialog = defineComponent({
  ui: 'dialog',

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
        p-4
        bg-backdrop`,

    '&--center': `
        items-center
        justify-center`,

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

    '&--top-left': `
        items-start
        justify-start`,

    '&--top-right': `
        items-start
        justify-end`,

    '&--bottom-left': `
        items-end
        justify-start`,

    '&--bottom-right': `
        items-end
        justify-end`,

    '&__panel': `
        w-md
        text-foreground
        relative
        z-10
        flex
        flex-col
        dialog-bg-panel
        dialog-border-panel
        border
        shadow-lg
        rounded-xl
        max-w-svw
        max-h-dvh
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
        dialog-text-close
        hover:dialog-text-close-hover
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

    '.dialog-enter-active, .dialog-leave-active': `
        transition-opacity
        duration-300`,

    '.dialog-enter-from, .dialog-leave-to': `
        opacity-0`,

    '.dialog-enter-active &__panel, .dialog-leave-active &__panel': `
        transition-[scale]
        duration-300`,

    '.dialog-enter-from &__panel, .dialog-leave-to &__panel': `
        scale-95`,
  },
})
