import { type UiFlexPropsWithMedia } from '@dotdev/ui-kit'

export interface FlexMeta {
  className: string
  props: UiFlexPropsWithMedia
}

const PREFIX_BY_PROP: Record<string, string> = {
  align: 'items',
  justify: 'justify',
  direction: 'flex',
  content: 'content',
  self: 'self',
}

function split(key: string): { media: string; prop: string } {
  const idx = key.indexOf(':')
  if (idx === -1) {
    return { media: '', prop: key }
  }
  return { media: key.slice(0, idx + 1), prop: key.slice(idx + 1) }
}

function toClass(key: string, value: unknown): string[] {
  const { media, prop } = split(key)

  if (prop === 'center') {
    if (value === undefined || value === false) return []
    return [`${media}items-center`, `${media}justify-center`]
  }

  if (prop === 'inline') {
    if (value === undefined || value === false) return []
    return [`${media}inline-flex`]
  }

  if (prop === 'wrap') {
    if (value === 'nowrap' || value === false) return [`${media}flex-nowrap`]
    if (value === 'wrap-reverse') return [`${media}flex-wrap-reverse`]
    return [`${media}flex-wrap`]
  }

  if (prop === 'grow') {
    if (value === true || value === '') return [`${media}grow`]
    if (value === false) return [`${media}grow-0`]
    return [`${media}grow-${value}`]
  }

  if (prop === 'shrink') {
    if (value === true || value === '') return [`${media}shrink`]
    if (value === false) return [`${media}shrink-0`]
    return [`${media}shrink-${value}`]
  }

  const prefix = PREFIX_BY_PROP[prop] ?? prop
  if (value === true || value === '') return [`${media}${prop}`]
  if (value === undefined || value === false) return []
  return [`${media}${prefix}-${value}`]
}

export function metaToCss(meta: FlexMeta) {
  const { className, props } = meta
  if (!className) return null

  const classes = Object.entries(props).flatMap(([key, value]) => toClass(key, value))

  return `@reference 'tailwindcss'; .${className} { @apply ${classes.join(' ')};}`
}
