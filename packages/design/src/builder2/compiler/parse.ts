export type TokenExpression =
  | {
      kind: 'css'
      raw: string
    }
  | {
      kind: 'ref'
      name: string
      raw: string
      alpha?: number
    }

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

export function parseTokenValue(value: string): TokenExpression {
  const input = value.trim()

  if (!input) {
    return { kind: 'css', raw: '' }
  }

  // Explicit CSS variable:
  //
  // --foo
  // var(--foo)
  // var(--foo, red)
  if (input.startsWith('--')) {
    return { kind: 'css', raw: `var(${input})` }
  }

  if (CSS_VARIABLE.test(input)) {
    return { kind: 'css', raw: input }
  }

  // Numbers:
  //
  // 0
  // 1
  // -1
  // 1.5
  // .5
  if (CSS_NUMBER.test(input)) {
    return { kind: 'css', raw: input }
  }

  // Dimensions:
  //
  // 4px
  // 1rem
  // 100%
  // 50vh
  // 1fr
  // 2deg
  if (CSS_DIMENSION.test(input)) {
    return { kind: 'css', raw: input }
  }

  // Hex colors
  //
  // #fff
  // #ffffff
  // #ffffffff
  if (CSS_HEX.test(input)) {
    return { kind: 'css', raw: input }
  }

  // CSS keywords
  if (CSS_KEYWORDS.has(input)) {
    return { kind: 'css', raw: input }
  }

  // CSS functions:
  //
  // rgb(...)
  // hsl(...)
  // color(...)
  // calc(...)
  // min(...)
  // max(...)
  // clamp(...)
  // linear-gradient(...)
  // url(...)
  if (CSS_FUNCTION.test(input)) {
    return { kind: 'css', raw: input }
  }

  // Token with alpha:
  //
  // brand-500/50
  // neutral-950/20
  //
  // becomes:
  //
  // color-mix(
  //   in oklab,
  //   var(--brand-500) 50%,
  //   transparent
  // )
  const alpha = parseTokenAlpha(input)

  if (alpha) {
    return {
      kind: 'ref',
      name: `--${alpha.name}`,
      alpha: alpha.value,
      raw: createTokenAlphaValue(alpha.name, alpha.value),
    }
  }

  return { kind: 'ref', name: `--${input}`, raw: `var(--${input})` }
}

function parseTokenAlpha(value: string): { name: string; value: number } | undefined {
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

  return {
    name,
    value: alpha,
  }
}

function createTokenAlphaValue(name: string, alpha: number): string {
  return ['color-mix(', 'in oklab,', `var(--${name}) ${alpha}%,`, 'transparent', ')'].join(' ')
}
