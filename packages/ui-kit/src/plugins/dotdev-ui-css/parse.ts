import { type BaseElementNode, ElementTypes, NodeTypes, type RootNode } from '@vue/compiler-core'
import { parse } from 'vue/compiler-sfc'
import MagicString from 'magic-string'

import { boxCoreKeys } from '../../components/primitives/constants.ts'

import { pluginBreakpoints, pluginVariants } from './map.ts'
import type { BoxMeta, ParsedBoxKey } from './types.ts'

const coreKeys = new Set<string>(boxCoreKeys)
const breakpoints = new Set<string>(pluginBreakpoints)
const variants = new Set<string>(pluginVariants)

function isBoxKey(name: string): boolean {
  if (coreKeys.has(name)) return true
  return parseBoxKey(name) !== null
}

/** Разбирает имя атрибута на breakpoint/variant-префиксы и базовый ключ. */
export function parseBoxKey(name: string): ParsedBoxKey | null {
  const parts = name.split(':')
  const base = parts[parts.length - 1]
  if (!coreKeys.has(base)) return null

  let breakpoint: ParsedBoxKey['breakpoint'] = null
  let variant: ParsedBoxKey['variant'] = null

  for (const part of parts.slice(0, -1)) {
    if (breakpoints.has(part)) {
      if (breakpoint !== null) return null
      breakpoint = part as ParsedBoxKey['breakpoint']
    } else if (variants.has(part)) {
      if (variant !== null) return null
      variant = part as ParsedBoxKey['variant']
    } else {
      return null
    }
  }

  return { breakpoint, variant, key: base as ParsedBoxKey['key'] }
}

function extractStatic(prop: any): string | null {
  if (prop.type !== NodeTypes.ATTRIBUTE) return null
  const value = prop.value?.content ?? ''
  return value === '' ? 'true' : value
}

/**
 * Собирает мету компонента Box-семейства. Вырезает стилевые пропсы из исходника
 * и подставляет имя класса (из `$class` или авто-хеша) в class-атрибут.
 */
function collectMeta(node: BaseElementNode, ms: MagicString | null, autoClass: boolean): BoxMeta {
  const props: Record<string, string> = {}
  let className: string | null = null
  let userClass: string | null = null

  for (const prop of node.props) {
    const name = prop.type === NodeTypes.ATTRIBUTE ? prop.name : null
    if (name === null) continue

    if (name === '$class') {
      const value = extractStatic(prop)
      if (value !== null && value !== '') className = value
      ms?.remove(prop.loc.start.offset, prop.loc.end.offset)
      continue
    }

    if (name === 'class') {
      const value = extractStatic(prop)
      userClass = value !== null && value !== '' ? value : null
      continue
    }

    if (isBoxKey(name)) {
      const value = extractStatic(prop)
      if (value !== null) props[name] = value
      ms?.remove(prop.loc.start.offset, prop.loc.end.offset)
    }
  }

  if (className === null && userClass !== null) {
    className = userClass.split(' ')[0]
  } else if (className === null && autoClass) {
    className = hashProps(props)
  }

  if (className !== null && className !== '' && ms && userClass === null) {
    ms.appendLeft(node.loc.start.offset + node.tag.length + 1, ` class="${className}"`)
  }

  return { className: className ?? '', props }
}

/** Детерминированный короткий хеш пропсов для имени класса. */
export function hashProps(props: Record<string, string>): string {
  const sorted = Object.keys(props)
    .sort()
    .map((k) => `${k}=${props[k]}`)
    .join('|')
  return 'dot' + fnv1a(sorted).toString(36)
}

function fnv1a(str: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export interface ParseResult {
  /** Исходник после вырезки пропсов и вставки классов (может быть идентичен входу). */
  code: string
  /** Собранные стилевые меты. */
  metas: BoxMeta[]
}

/**
 * Парсит SFC, находит Box-ноды и собирает меты + изменённый исходник.
 * Компоненты распознаются по имени (или неймспейс-суффиксу) из `components`.
 */
export function collectFromSfc(code: string, components: Set<string>, autoClass: boolean): ParseResult {
  const { descriptor } = parse(code)
  const ast = descriptor.template?.ast
  if (!ast) return { code, metas: [] }

  const metas: BoxMeta[] = []
  const ms = new MagicString(code)
  let changed = false

  walk(ast as RootNode, (node) => {
    if (!isBoxComponent(node, components)) return
    const meta = collectMeta(node, ms, autoClass)
    if (Object.keys(meta.props).length > 0 || meta.className) {
      metas.push(meta)
      changed = true
    }
  })

  return { code: changed ? ms.toString() : code, metas }
}

function isBoxComponent(node: any, components: Set<string>): node is BaseElementNode {
  if (node?.type !== NodeTypes.ELEMENT || node.tagType !== ElementTypes.COMPONENT) return false
  const name = node.tag.includes(':') ? node.tag.slice(node.tag.lastIndexOf(':') + 1) : node.tag
  return components.has(name)
}

function walk(node: any, visit: (node: BaseElementNode) => void): void {
  if (!node) return
  visit(node)
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visit)
  }
}
