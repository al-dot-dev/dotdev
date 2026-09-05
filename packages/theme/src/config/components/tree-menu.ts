import { defineComponent } from '@dotdev/design'

export const treeMenu = defineComponent({
  ui: 'tree-menu',

  semantics: {
    'text-node': 'text-muted',
    'text-node-hover': 'text-foreground',
    'text-node-active': 'text-foreground',
    'bg-node-hover': 'bg-neutral-soft',
    'bg-node-active': 'bg-neutral-soft',
    'text-indicator': 'text-muted',
    'text-indicator-open': 'text-foreground',
    'border-indent': 'border-default',

    gap: 'gap-xs',
    'gap-node': 'gap-md',
    'px-node-sm': 'space-sm',
    'px-node-md': 'space-md',
    'px-node-lg': 'space-lg',
    'h-node-sm': 'size-sm',
    'h-node-md': 'size-md',
    'h-node-lg': 'size-lg',
    'rounded-node': 'radius-md',
    'type-sm': 'type-sm',
    'type-md': 'type-sm',
    'type-lg': 'type-md',
  },

  utilities: {
    transition: 'transition-[background-color,color,opacity,height]',
    'transition-indicator': 'transition-[transform,rotate,color]',
    'size-node-sm': 'tree-menu-px-node-sm tree-menu-h-node-sm tree-menu-gap-node',
    'size-node-md': 'tree-menu-px-node-md tree-menu-h-node-md tree-menu-gap-node',
    'size-node-lg': 'tree-menu-px-node-lg tree-menu-h-node-lg tree-menu-gap-node',
  },

  rules: {
    '&': `
        tree-menu-transition
        flex
        flex-col
        tree-menu-gap
        list-none
        overflow-hidden
        p-0
        m-0`,

    '& &': `
        pl-2
    `,

    '&--sm': `
        tree-menu-type-sm`,

    '&--md': `
        tree-menu-type-md`,

    '&--lg': `
        tree-menu-type-lg`,

    '&__item': `
        tree-menu-gap-node
        tree-menu-px-node-md
        tree-menu-h-node-md
        tree-menu-rounded-node
        tree-menu-text-node
        tree-menu-transition
        flex
        w-full
        items-center
        outline-none
        cursor-pointer
        select-none`,

    '&__item:is(:hover, :focus-visible, &__item--focused)': `
        tree-menu-text-node-hover
        tree-menu-bg-node-hover`,

    '&__item--focused': `
        tree-menu-text-node-active
        tree-menu-bg-node-active`,

    '&__item--disabled': `
        disabled`,

    '&--sm &__item': `
        tree-menu-size-node-sm`,

    '&--md &__item': `
        tree-menu-size-node-md`,

    '&--lg &__item': `
        tree-menu-size-node-lg`,

    '&__node-icon': `
        text-[1.2em]`,

    '&__indicator': `
        tree-menu-text-indicator
        ml-auto`,

    '&__indicator-icon': `
        tree-menu-transition-indicator`,

    '&__node--expanded &__indicator': `
        tree-menu-text-indicator-open`,

    '&__node--expanded &__indicator-icon': `
        rotate-90`,

    '&__branch': `
        flex
        flex-col`,

    '&__children': `
        flex
        flex-col
        tree-menu-gap`,
  },
})
