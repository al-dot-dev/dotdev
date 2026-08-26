import { defineComponent } from '@dotdev/design'

export const layout = defineComponent({
  ui: 'layout',
  semantics: {
    'h-header': '56px',
    'w-sidebar': '240px',
    duration: '350ms',
  },
  utilities: {
    root: 'bg-background text-foreground transition-[background-color]',
    panel: 'bg-surface border-default transition-[background-color,border-color]',
  },
  rules: {
    '&': 'flex flex-1 min-w-[0]',
    '&--root': 'w-full min-h-svh layout-root',
    '&--has-sidebar': 'flex-row',
    '&--has-header': 'flex-col',

    '&-sidebar': `shrink-0`,
    '&--sidebar-desktop &-sidebar': 'sticky top-0 z-dialog h-dvh overflow-hidden layout-w-sidebar',
    '&--sidebar-desktop &-sidebar__wrapper': 'absolute inset-y-0 right-0',
    '&--sidebar-desktop.&--has-header &-sidebar': `top-(--$ns-layout-h-header) h-[calc(100dvh-var(--$ns-layout-h-header))]`,

    '&--sidebar-mobile &-sidebar': 'z-dialog fixed inset-0 bg-backdrop',
    '&--sidebar-mobile &-sidebar__wrapper': 'w-(--$ns-layout-w-sidebar)',

    '&-sidebar__wrapper': 'flex h-full flex-col min-w-(--$ns-layout-w-sidebar) border-r layout-panel',
    '&-sidebar__header': 'flex shrink-0 items-center layout-h-header px-4',
    '&-sidebar__body': 'flex-1 overflow-y-auto p-4',
    '&-sidebar__footer': 'flex shrink-0 items-center justify-between px-4 py-4',

    '&-header': `sticky top-0 z-overlay flex shrink-0 items-center justify-between gap-2 border-b px-4 layout-panel layout-h-header`,
    '&-header__group': 'flex items-center gap-2',

    '&-content': 'flex-1 min-w-[0]',

    // animations
    '&--sidebar-desktop .layout-sidebar-enter-active, &--sidebar-desktop .layout-sidebar-leave-active': `transition-[width] layout-duration`,
    '&--sidebar-desktop .layout-sidebar-enter-from.&-sidebar, &--sidebar-desktop .layout-sidebar-leave-to.&-sidebar': `w-[0px]`,

    '&--sidebar-mobile .layout-sidebar-enter-active, &--sidebar-mobile .layout-sidebar-leave-active': `transition-[background-color] layout-duration`,
    '&--sidebar-mobile .layout-sidebar-enter-from.&-sidebar, &--sidebar-mobile .layout-sidebar-leave-to.&-sidebar': `bg-transparent`,
    '&--sidebar-mobile .layout-sidebar-enter-active .&-sidebar__wrapper, &--sidebar-mobile .layout-sidebar-leave-active .&-sidebar__wrapper': `transition-[translate] layout-duration`,
    '&--sidebar-mobile .layout-sidebar-enter-from .&-sidebar__wrapper, &--sidebar-mobile .layout-sidebar-leave-to .&-sidebar__wrapper': `-translate-x-full`,
  },
})
