import { boxBreakpoints, boxCoreKeys, boxVariants } from '../../components/primitives/constants.ts'

import type { ParsedBoxKey } from './types.ts'

type CoreKey = (typeof boxCoreKeys)[number]

/** Маппинг «в лоб»: класс = `<prefix>-<value>` (напр. `p-4`, `bg-surface`). */
const PREFIXED: Partial<Record<CoreKey, string>> = {
  inset: 'inset',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  float: 'float',
  z: 'z',
  direction: 'flex',
  justify: 'justify',
  align: 'items',
  content: 'content',
  self: 'self',
  order: 'order',
  gap: 'gap',
  spaceX: 'space-x',
  spaceY: 'space-y',
  basis: 'basis',
  cols: 'grid-cols',
  rows: 'grid-rows',
  flow: 'grid-flow',
  autoCols: 'auto-cols',
  autoRows: 'auto-rows',
  placeItems: 'place-items',
  placeSelf: 'place-self',
  placeContent: 'place-content',
  w: 'w',
  h: 'h',
  minW: 'min-w',
  minH: 'min-h',
  maxW: 'max-w',
  maxH: 'max-h',
  size: 'size',
  aspect: 'aspect',
  p: 'p',
  px: 'px',
  py: 'py',
  pt: 'pt',
  pr: 'pr',
  pb: 'pb',
  pl: 'pl',
  m: 'm',
  mx: 'mx',
  my: 'my',
  mt: 'mt',
  mr: 'mr',
  mb: 'mb',
  ml: 'ml',
  overflow: 'overflow',
  overflowX: 'overflow-x',
  overflowY: 'overflow-y',
  overscroll: 'overscroll',
  bg: 'bg',
  borderColor: 'border',
  borderStyle: 'border',
  rounded: 'rounded',
  shadow: 'shadow',
  ring: 'ring',
  outline: 'outline',
  opacity: 'opacity',
  cursor: 'cursor',
  select: 'select',
  objectFit: 'object',
  objectPosition: 'object',
  transition: 'transition',
  animate: 'animate',
}

/**
 * Класс формируется из самого значения (значение и есть tailwind-класс).
 * Например `display="flex"` -> `flex`, `position="absolute"` -> `absolute`.
 */
const RAW: ReadonlySet<CoreKey> = new Set(['display', 'position'])

/** Пропсы с фиксированным классом независимо от значения. */
const LITERAL: Partial<Record<CoreKey, string>> = {
  hidden: 'hidden',
  visible: 'visible',
  inline: 'inline-flex',
}

/**
 * Превращает разобранный пропс в готовые tailwind-классы.
 * Возвращает `null`, если пропс не является стилевым (напр. `$class`).
 */
export function toTailwindClass(parsed: ParsedBoxKey, value: string): string[] | null {
  if (parsed.key === '$class') return null

  const prefix = applyModifier(parsed, '')
  const core = toCoreClass(parsed.key, value)
  if (core === null) return null

  return core.map((c) => `${prefix}${c}`.replace(/:$/, ''))
}

/** Хвост модификатора (breakpoint/variant) без завершающего двоеточия пустым. */
function applyModifier(parsed: ParsedBoxKey, base: string): string {
  const parts: string[] = []
  if (parsed.breakpoint) parts.push(parsed.breakpoint)
  if (parsed.variant) parts.push(parsed.variant)
  return parts.length === 0 ? base : `${parts.join(':')}:`
}

/** Класс для базового пропса без модификатора. */
function toCoreClass(key: CoreKey, value: string): string[] | null {
  if (RAW.has(key)) return [value]
  const literal = LITERAL[key]
  if (literal !== undefined) return [literal]

  const prefix = PREFIXED[key]
  if (prefix !== undefined) return [`${prefix}-${value}`]

  return specialClass(key, value)
}

/** Пропсы с особой логикой (boolean-значения, разнобой в префиксах). */
function specialClass(key: CoreKey, value: string): string[] | null {
  switch (key) {
    case 'border':
      return value === 'true' ? ['border'] : value === '' ? null : [`border-${value}`]
    case 'grow':
      return value === 'true' ? ['grow'] : value ? [`grow-${value}`] : null
    case 'shrink':
      return value === 'true' ? ['shrink'] : value ? [`shrink-${value}`] : null
    case 'wrap':
      return value === 'true' ? ['flex-wrap'] : value === 'false' ? ['flex-nowrap'] : [`flex-${value}`]
    case 'center':
      return value === 'true' ? ['justify-center', 'items-center'] : null
    case 'pointerEvents':
      return value === 'true' ? ['pointer-events-auto'] : value === 'false' ? ['pointer-events-none'] : null
    case 'resize':
      return value === 'true'
        ? ['resize']
        : value === 'none'
          ? ['resize-none']
          : value === 'y'
            ? ['resize-y']
            : value === 'x'
              ? ['resize-x']
              : null
    default:
      return null
  }
}

/** Список валидных breakpoint-имён плагина. */
export const pluginBreakpoints = boxBreakpoints
/** Список валидных variant-имён плагина. */
export const pluginVariants = boxVariants
