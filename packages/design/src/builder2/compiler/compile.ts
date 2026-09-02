import type { DesignDefinition } from '../types/model.ts'
import { createContext } from './context.ts'
import { collect } from './collect.ts'
import { resolve } from './resolve.ts'
import { validate } from './validate.ts'
import { graph } from './graph.ts'
import { BuildContext, RuleIR, TokenIR, UtilityIR } from './types.ts'
import { tokensToCss } from './css/tokens.ts'

export function compile(design: DesignDefinition) {
  const context = createContext(design)
  collect(context)
  resolve(context)
  validate(context)
  graph(context)

  return {
    tokensToCss: (tokens?: Map<string, TokenIR>) => tokensToCss(context, tokens || context.tokens),
    utilitiesToCss: (utilities: Map<string, UtilityIR>) => utilitiesToCss(context, utilities),
    rulesToCss: (rules: RuleIR[]) => rulesToCss(context, rules),
  }
}

function utilitiesToCss(context: BuildContext, utilities: Map<string, UtilityIR>) {}
function rulesToCss(context: BuildContext, rules: RuleIR[]) {}
