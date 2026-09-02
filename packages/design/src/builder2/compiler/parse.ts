import { BuildContext, TokenReference } from './types.ts'

const CSS_KEYWORDS = new Set([
  'auto',
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
  'transparent',
  'currentcolor',
  'currentColor',
  'none',
  'normal',
  'medium',
  'thin',
  'thick',
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
])

const CSS_FUNCTION = /^[a-z-][a-z0-9-]*\s*\(/i
const CSS_NUMBER = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?$/i
const CSS_DIMENSION = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:[a-z]+|%)$/i
const CSS_HEX = /^#[0-9a-f]{3,8}$/i
const CSS_VARIABLE = /^var\(\s*--[\w-]+(?:\s*,[\s\S]+)?\s*\)$/i
const TOKEN_ALPHA = /^(.+?)\/(\d+(?:\.\d+)?)$/

export function parseTokenValue(context: BuildContext, value: TokenReference): TokenReference {
  if (typeof value !== 'string') return value

  const input = value.trim()

  if (!input) {
    return ''
  }

  const reference = resolveTokenReference(context, input)

  if (reference) {
    return reference
  }

  if (input.startsWith('--')) {
    return `var(${input})`
  }

  if (CSS_VARIABLE.test(input)) {
    return input
  }

  if (CSS_NUMBER.test(input)) {
    return input
  }

  if (CSS_DIMENSION.test(input)) {
    return input
  }

  if (CSS_HEX.test(input)) {
    return input
  }

  if (CSS_KEYWORDS.has(input)) {
    return input
  }

  if (CSS_FUNCTION.test(input)) {
    return input
  }

  return { ref: input }
}

function resolveTokenReference(context: BuildContext, value: string): TokenReference | undefined {
  const alpha = parseTokenAlpha(value)

  if (alpha !== undefined) {
    if (!context.tokens.has(alpha.name)) {
      return undefined
    }

    return { ref: alpha.name, alpha: alpha.value }
  }

  if (!context.tokens.has(value)) {
    return undefined
  }

  return { ref: value }
}

function parseTokenAlpha(value: string) {
  const match = value.match(TOKEN_ALPHA)

  if (!match) {
    return undefined
  }

  const name = match[1].trim()
  const alpha = Number(match[2])

  if (!name || !Number.isFinite(alpha)) {
    return undefined
  }

  if (alpha < 0 || alpha > 100) {
    return undefined
  }

  return { name, value: alpha }
}
