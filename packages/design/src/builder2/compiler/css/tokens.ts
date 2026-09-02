import type { BuildContext, TokenIR, TokenReference } from '../types.ts'

export function tokensToCss(context: BuildContext, tokens: Map<string, TokenIR>): string {
  const prefix = createTokenPrefix(context.design.namespace)
  const darkSelector = context.design.dark ?? 'auto'

  const lightVars: string[] = []
  const darkVars: string[] = []

  for (const token of tokens.values()) {
    const name = `${prefix}${token.name}`

    const light = tokenValueToCss(token.light, prefix)

    if (darkSelector === 'auto' && token.dark !== undefined) {
      const dark = tokenValueToCss(token.dark, prefix)
      lightVars.push(`  ${name}: light-dark(${light}, ${dark});`)

      continue
    }

    lightVars.push(`  ${name}: ${light};`)

    if (token.dark !== undefined) {
      const dark = tokenValueToCss(token.dark, prefix)
      darkVars.push(`  ${name}: ${dark};`)
    }
  }

  return createCss(lightVars, darkVars, darkSelector)
}

function createTokenPrefix(namespace?: string): string {
  return namespace ? `--${namespace}-` : '--'
}

function tokenValueToCss(reference: TokenReference, prefix: string): string {
  if (typeof reference === 'string') {
    return resolveNamespace(reference, prefix)
  }

  const variable = `var(${prefix}${reference.ref})`

  if (reference.alpha === undefined) {
    return variable
  }

  return `color-mix(in oklab, ${variable} ${reference.alpha}%, transparent)`
}

function resolveNamespace(value: string, prefix: string): string {
  return value.replaceAll('--$ns-', prefix)
}

function createCss(lightVars: string[], darkVars: string[], darkSelector: string): string {
  const sections = [`@theme {\n${lightVars.join('\n')}\n}`]

  if (darkSelector !== 'auto' && darkVars.length > 0) {
    sections.push(`${darkSelector} {\n${darkVars.join('\n')}\n}`)
  }

  return sections.join('\n\n')
}
