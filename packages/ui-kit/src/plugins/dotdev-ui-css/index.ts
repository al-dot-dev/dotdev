import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'

import { collectFromSfc } from './parse.ts'
import { metaToCss } from './css.ts'
import { isVirtualCss, virtualCssFilePath, virtualCssId } from './virtual.ts'
import type { DotdevUiCssOptions } from './types.ts'

const DEFAULT_COMPONENTS = ['Box']

/**
 * build-time плагин: читает статические стилевые пропсы компонентов семейства Box,
 * вырезает их из template и генерирует CSS-блок с `@apply`, отдаваемый виртуальным
 * модулем (который обрабатывает Tailwind). Никакого runtime — классы цепляются
 * именем класса-селектора (`$class` либо авто-хеш).
 */
export function dotdevUiCss(options: DotdevUiCssOptions = {}): Plugin {
  const components = new Set(options.components ?? DEFAULT_COMPONENTS)
  const autoClass = options.autoClass ?? true

  function collectGeneratedCss(code: string): string {
    const { metas } = collectFromSfc(code, components, autoClass)
    return ['@reference "tailwindcss";', ...metas.map((meta) => metaToCss(meta))].filter(Boolean).join('\n')
  }

  function injectVirtualCssImport(code: string, filePath: string): string | null {
    const prev = code
    const next = collectFromSfc(code, components, autoClass)
    if (next.code === prev) return null
    return addScriptImport(next.code, virtualCssId(filePath))
  }

  return {
    name: 'dotdev-ui-css',
    enforce: 'pre',

    transform(code, id) {
      const [path, query] = id.split('?')
      if (query) return
      if (!path.endsWith('.vue')) return

      const updated = injectVirtualCssImport(code, path)
      if (updated !== null) return { code: updated, map: null }
    },

    resolveId(id) {
      return isVirtualCss(id) ? id : undefined
    },

    load(id) {
      const filePath = virtualCssFilePath(id)
      if (filePath === null) return
      this.addWatchFile(filePath)
      return collectGeneratedCss(readFileSync(filePath, 'utf8'))
    },
  }
}

function addScriptImport(code: string, importId: string): string {
  const importLine = `\nimport ${JSON.stringify(importId)}\n`

  const scriptMatch = code.match(/<script\b[^>]*>[\s\S]*?<\/script>/)
  if (scriptMatch) {
    const openEnd = scriptMatch[0].indexOf('>') + 1
    return code.slice(0, scriptMatch.index! + openEnd) + importLine + code.slice(scriptMatch.index! + openEnd)
  }

  const before = code.search(/<(template|style)\b/)
  const scriptBlock = `<script>\n${importLine}</script>\n`
  if (before !== -1) return code.slice(0, before) + scriptBlock + code.slice(before)
  return code + scriptBlock
}

export { collectFromSfc } from './parse.ts'
export { metaToCss } from './css.ts'
export type { BoxMeta, DotdevUiCssOptions, ParsedBoxKey } from './types.ts'
