import { defineComponent } from '@dotdev/design'

export const layout = defineComponent({
  ui: 'layout',
  semantics: {
    'h-header': '56px',
    'w-sidebar': '240px',
  },
  utilities: {
    root: 'bg-background text-foreground transition-[background-color]',
    panel: 'bg-surface border-default transition-[background-color,border]',
  },
  rules: {
    '&': 'flex min-h-svh w-full layout-root',

    '&__body': 'flex min-w-0 flex-1 flex-col',

    '&-sidebar': `sticky top-0 z-50 flex h-svh shrink-0 flex-col overflow-hidden border-r layout-panel layout-w-sidebar`,
    '&-sidebar__header': 'flex shrink-0 items-center px-4 layout-h-header',
    '&-sidebar__body': 'flex-1 overflow-y-auto px-2 py-4',
    '&-sidebar__footer': 'flex shrink-0 items-center justify-between px-4 py-3',

    '&-header': `sticky top-0 z-100 flex shrink-0 items-center justify-between gap-2 border-b px-4 layout-panel layout-h-header`,
    '&-header__group': 'flex items-center gap-2',
  },
})
