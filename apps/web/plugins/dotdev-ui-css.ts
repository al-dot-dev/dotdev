import { type BaseElementNode, ElementTypes, NodeTypes, type RootNode } from '@vue/compiler-core'
import type { Plugin } from 'vite'
import { parse } from 'vue/compiler-sfc'
import MagicString from 'magic-string'
import { readFileSync } from 'node:fs'
import { type FlexMeta, metaToCss } from './meta-to-css'

// Мы не вставляем <style> в SFC: @vitejs/plugin-vue собирает descriptor'ы из файла на
// диске, а после HMR перечитывает их заново. Инжектированный нами в памяти <style>
// туда не попадает, и плагин не может отдать такой блок: vite падает на сырой .vue
// файл, и @tailwindcss/vite парсит его как CSS (`Invalid declaration: 'Button, Test'`).
// Поэтому CSS отдаётся отдельным виртуальным модулем, который импортируется скриптом.
const VIRTUAL_CSS_PREFIX = '\0dotdev-ui-css:'

function virtualCssId(filePath: string): string {
  return `${VIRTUAL_CSS_PREFIX}${filePath}.css`
}

function virtualCssFilePath(id: string): string | null {
  if (!id.startsWith(VIRTUAL_CSS_PREFIX) || !id.endsWith('.css')) return null
  return id.slice(VIRTUAL_CSS_PREFIX.length, -'.css'.length)
}

export function dotdevUiCss(): Plugin {
  function collectGeneratedCss(code: string): string | null {
    if (!/<Flex[\s>]/.test(code)) return null

    const { descriptor } = parse(code)
    if (!descriptor.template?.ast) return null

    const metas = collectFlexMetas(descriptor.template.ast as RootNode)
    if (metas.length === 0) return null

    return metas
      .map((meta) => metaToCss(meta))
      .filter(Boolean)
      .join('\n')
  }

  function injectVirtualCssImport(code: string, filePath: string): string {
    if (!/<Flex[\s>]/.test(code)) return code

    const { descriptor } = parse(code)
    if (!descriptor.template?.ast) return code

    // Оборачиваем исходный код в MagicString для безопасного редактирования
    const ms = new MagicString(code)

    // Вырезаем кастомные атрибуты и собираем метаданные
    const metas = collectFlexMetas(descriptor.template.ast as RootNode, ms)
    if (metas.length === 0) return code

    // Получаем код БЕЗ наших кастомных атрибутов и подключаем виртуальный CSS модуль
    const cleanedCode = ms.toString()
    return addScriptImport(cleanedCode, virtualCssId(filePath))
  }

  return {
    name: 'dotdev-ui-css',
    enforce: 'pre',

    transform(code: string, id: string) {
      const [path, query] = id.split('?')
      if (query) return

      // Виртуальный CSS модуль (`.vue.css`) — не трогаем, его обрабатывает tailwind
      if (!path.endsWith('.vue')) return

      const updatedCode = injectVirtualCssImport(code, path)
      if (updatedCode !== code) {
        return { code: updatedCode, map: null }
      }
    },

    resolveId(id) {
      return virtualCssFilePath(id) ? id : undefined
    },

    load(id) {
      const filePath = virtualCssFilePath(id)
      if (!filePath) return
      this.addWatchFile(filePath)

      const css = collectGeneratedCss(readFileSync(filePath, 'utf8'))
      if (css == null) return ''
      return css
    },
  }
}

// --- Утилиты SFC ---

function addScriptImport(code: string, importId: string): string {
  const importLine = `\nimport ${JSON.stringify(importId)}\n`

  const scriptMatch = code.match(/<script\b[^>]*>[\s\S]*?<\/script>/)
  if (scriptMatch) {
    const openEnd = scriptMatch[0].indexOf('>') + 1
    return code.slice(0, scriptMatch.index! + openEnd) + importLine + code.slice(scriptMatch.index! + openEnd)
  }

  // В файле нет <script> — добавляем отдельный блок перед <template>/<style>
  const before = code.search(/<(template|style)\b/)
  const scriptBlock = `<script>\n${importLine}</script>\n`
  if (before !== -1) return code.slice(0, before) + scriptBlock + code.slice(before)
  return code + scriptBlock
}

// --- Утилиты AST ---

function collectFlexMetas(root: RootNode, ms?: MagicString): FlexMeta[] {
  const metas: FlexMeta[] = []

  walk(root, (node) => {
    if (!isFlexComponent(node)) return

    const props: Record<string, string> = {}
    let className = 'test-class'

    for (const prop of node.props) {
      if (prop.type !== NodeTypes.ATTRIBUTE) continue

      if (prop.name === 'class') {
        className = prop.value?.content.split(' ')[0] ?? ''
      } else {
        props[prop.name] = prop.value?.content ?? ''

        // ВЫРЕЗАЕМ атрибут из исходного кода!
        // prop.loc содержит точные координаты (start и end) атрибута в файле.
        ms?.remove(prop.loc.start.offset, prop.loc.end.offset)
      }
    }

    if (Object.keys(props).length > 0) {
      metas.push({ className, props })
    }
  })
  return metas
}

function isFlexComponent(node: any): node is BaseElementNode {
  return (
    node?.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.COMPONENT &&
    // Проверяем и локальный Flex, и namespace'd ноды (например, Tui.Flex)
    (node.tag === 'Flex' || node.tag.endsWith(':Flex'))
  )
}

function walk(node: any, visit: (node: BaseElementNode) => void): void {
  if (!node) return

  visit(node)

  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visit)
  }
}
