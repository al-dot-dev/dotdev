import { BuildContext, Owner, TokenIR, TokenReference } from './types.ts'
import { parseTokenValue } from './parse.ts'

export function resolve(context: BuildContext) {
  resolveTokens(context)
  resolveUtilities(context)
  resolveRules(context)
}

function resolveTokens(context: BuildContext) {
  for (const token of context.tokens.values()) {
    resolveToken(context, token)
  }
}

function resolveToken(context: BuildContext, token: TokenIR) {
  token.light = resolveTokenValue(context, token, token.light)!
  token.dark = resolveTokenValue(context, token, token.dark)
}

function resolveTokenValue(context: BuildContext, token: TokenIR, value?: TokenReference) {
  if (value === undefined) {
    return undefined
  }

  const reference = parseTokenValue(context, value)

  if (typeof reference === 'string') {
    return reference
  }

  const target = context.tokens.get(reference.ref)
  if (!target) {
    addError(context, `Token "${token.name}" references unknown token "${reference.ref}"`)
    return undefined
  }

  return reference
}

function resolveUtilities(context: BuildContext) {
  for (const utility of context.utilities.values()) {
    utility.classes = resolveClasses(utility.classes, utility.owner)
  }
}

function resolveRules(context: BuildContext) {
  for (const component of context.components.values()) {
    const owner: Owner = {
      kind: 'component',
      name: component.name,
    }

    component.rules = component.rules.map((rule) => ({
      selector: resolveSelector(rule.selector, component.name),
      classes: resolveClasses(rule.classes, owner),
    }))
  }
}

function resolveSelector(selector: string, componentName: string): string {
  return selector.replaceAll('&', `.${componentName}`).replaceAll('..', '.')
}

function resolveClasses(classes: string[], owner: Owner): string[] {
  if (owner.kind === 'design') {
    return classes
  }

  return classes.map((value) => value.replaceAll('&', owner.name))
}

function addError(context: BuildContext, message: string) {
  context.diagnostics.push({
    level: 'error',
    message,
  })
}
