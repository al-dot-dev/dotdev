import type { DesignDefinition } from '../types/model.ts'

export type Owner = { kind: 'design' } | { kind: 'component'; name: string }
export type TokenReference = { ref: string; alpha?: number } | string

export interface TokenIR {
  name: string
  owner: Owner
  light: TokenReference
  dark?: TokenReference
}

export interface SemanticIR {
  name: string
  owner: Owner
  utility: string
  tokenName: string
}

export interface UtilityIR {
  name: string
  owner: Owner
  utility: string
  classes: string[]
}

export interface RuleIR {
  selector: string
  classes: string[]
}

export interface ComponentIR {
  name: string
  rules: RuleIR[]
}

export interface Diagnostic {
  level: 'error' | 'warning'
  message: string
}

export interface DependencyGraph {
  edges: Map<string, Set<string>>
}

export interface BuildContext {
  design: DesignDefinition
  tokens: Map<string, TokenIR>
  semantics: Map<string, SemanticIR>
  utilities: Map<string, UtilityIR>
  components: Map<string, ComponentIR>

  diagnostics: Diagnostic[]
  graph: DependencyGraph
}
