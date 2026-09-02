import type { ComponentDefinition, DesignDefinition, Semantics, Tokens, TokenValue, Utilities } from '../types/model.ts'
import type { BuildContext, Diagnostic, Owner } from './types.ts'
import { flattenObject } from '../utils/index.ts'

export function collect(context: BuildContext) {
  collectDesign(context, context.design)

  for (const component of Object.values(context.design.components ?? {})) {
    collectComponent(context, component)
  }
}

function collectDesign(context: BuildContext, design: DesignDefinition) {
  const owner: Owner = { kind: 'design' }

  collectTokens(context, design.tokens, owner)
  collectSemantics(context, design.semantics, owner)
  collectUtilities(context, design.utilities, owner)
}

function collectComponent(context: BuildContext, component: ComponentDefinition) {
  const name = component.ui
  const owner: Owner = { kind: 'component', name }

  const rules = component.rules ?? {}
  context.components.set(name, {
    name,
    rules: Object.entries(rules).map(([selector, value]) => ({
      selector,
      classes: split(value),
    })),
  })

  collectTokens(context, component.tokens, owner)
  collectSemantics(context, component.semantics, owner)
  collectUtilities(context, component.utilities, owner)
}

function collectTokens(context: BuildContext, tokens: Tokens = {}, owner: Owner) {
  for (const [key, value] of Object.entries(tokens)) {
    const name = createName(key, owner)
    addToken(context, name, value, owner)
  }
}

function addToken(context: BuildContext, name: string, value: TokenValue, owner: Owner) {
  const duplicate = context.tokens.get(name)
  if (duplicate) {
    context.diagnostics.push(createDuplicateWarning(name, 'token', duplicate.owner))
    return
  }

  const light = getLightValue(value)
  const dark = getDarkValue(value)

  context.tokens.set(name, { name, owner, light, dark })
}

function collectSemantics(context: BuildContext, semantics: Semantics = {}, owner: Owner) {
  const flattened = flattenObject(semantics)

  for (const [key, value] of Object.entries(flattened)) {
    if (!isTokenValue(value)) continue

    const name = createName(key, owner)

    const duplicate = context.semantics.get(name)
    if (duplicate) {
      context.diagnostics.push(createDuplicateWarning(name, 'semantic', duplicate.owner))
      continue
    }

    const utility = getUtility(key, semantics)
    const tokenName = createName(key, owner)

    context.semantics.set(name, { name, owner, utility, tokenName })

    addToken(context, tokenName, value, owner)
    addUtility(context, name, utility, `${utility}-(${tokenName})`, owner)
  }
}

function collectUtilities(context: BuildContext, utilities: Utilities = {}, owner: Owner) {
  for (const [key, value] of Object.entries(utilities)) {
    const name = createName(key, owner)
    const utility = getUtility(key)
    addUtility(context, name, utility, value, owner)
  }
}

function addUtility(context: BuildContext, name: string, utility: string, value: string, owner: Owner) {
  const duplicate = context.utilities.get(name)
  if (duplicate) {
    context.diagnostics.push(createDuplicateWarning(name, 'utility', duplicate.owner))
    return
  }

  context.utilities.set(name, { name, owner, utility, classes: split(value) })
}

function getUtility(name: string, from?: Record<string, any>): string {
  if (from) {
    return from[name] ? name.split('-').at(0)! : name.split('-').at(-1)!
  }

  return name.split('-').at(0)!
}

function createName(name: string, owner: Owner): string {
  if (owner.kind === 'design') {
    return name
  }

  return `${owner.name}-${name}`
}

function getLightValue(value: TokenValue): string {
  return Array.isArray(value) ? value[0] : value
}

function getDarkValue(value: TokenValue): string | undefined {
  return Array.isArray(value) ? value[1] : undefined
}

function isTokenValue(value: unknown): value is TokenValue {
  return typeof value === 'string' || Array.isArray(value)
}

function split(value: string) {
  return value.trim().split(/\s+/)
}

type WarningKind = 'token' | 'semantic' | 'utility'
function createDuplicateWarning(name: string, kind: WarningKind, owner: Owner): Diagnostic {
  const scope = owner.kind === 'design' ? 'design' : `component "${owner.name}"`

  return {
    level: 'warning',
    message: `${kind} "${name}" is already defined in ${scope}`,
  }
}
