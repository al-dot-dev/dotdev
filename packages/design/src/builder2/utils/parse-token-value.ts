export type TokenExpression = { kind: 'css'; raw: string } | { kind: 'ref'; name: string; raw: string }

const CSS_KEYWORDS = new Set([
  'auto',
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
  'transparent',
  'currentColor',
  'none',
])

const CSS_FUNCTION = /^[a-z-]+\s*\(.*\)$/i
const CSS_DIMENSION = /^-?(?:\d+\.?\d*|\.\d+)(?:[a-z]+|%)$/i
const TOKEN_ALPHA = /^(.+)\/(\d+(?:\.\d+)?)$/

export function parseTokenValue(value: string): TokenExpression {
  const input = value.trim()

  if (input === '') {
    return { kind: 'css', raw: '' }
  }

  if (Number.isFinite(Number(input))) {
    return { kind: 'css', raw: input }
  }

  if (input.startsWith('--')) {
    return { kind: 'css', raw: `var(${input})` }
  }

  if (/^var\(\s*--[^)]+\)$/i.test(input)) {
    return { kind: 'css', raw: input }
  }

  if (CSS_FUNCTION.test(input)) {
    return { kind: 'css', raw: input }
  }

  if (CSS_DIMENSION.test(input)) {
    return { kind: 'css', raw: input }
  }

  if (CSS_KEYWORDS.has(input)) {
    return { kind: 'css', raw: input }
  }

  const alphaMatch = input.match(TOKEN_ALPHA)

  if (alphaMatch) {
    const [, name, alpha] = alphaMatch
    return { kind: 'ref', name: `--${name}`, raw: `color-mix(in oklab, var(--${name}) ${alpha}%, transparent)` }
  }

  return { kind: 'ref', name: `--${input}`, raw: `var(--${input})` }
}
