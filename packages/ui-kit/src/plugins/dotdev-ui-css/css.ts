import { parseBoxKey } from './parse.ts'
import { toTailwindClass } from './map.ts'
import type { BoxMeta } from './types.ts'

/**
 * Превращает одну мету в CSS-блок вида:
 *   .<className> {
 *     @apply bg-surface p-4 sm:p-6 hover:bg-brand-600;
 *   }
 */
export function metaToCss(meta: BoxMeta): string {
  const classes: string[] = []

  for (const [name, value] of Object.entries(meta.props)) {
    const parsed = parseBoxKey(name)
    if (parsed === null) continue
    const tailwind = toTailwindClass(parsed, value)
    if (tailwind === null) continue
    classes.push(...tailwind)
  }

  if (classes.length === 0 || meta.className === '') return ''

  return `\n.${escapeSelector(meta.className)} {\n  @apply ${classes.join(' ')};\n}`
}

function escapeSelector(name: string): string {
  return name.replace(/([^\w-])/g, '\\$1')
}
