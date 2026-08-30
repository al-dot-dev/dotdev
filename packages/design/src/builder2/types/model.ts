export type Style = string
export type TokenValue = Style | [Style, Style]
export type UtilityValue = string
export type RuleValue = string

export type Tokens = Record<string, TokenValue>
export type Utilities = Record<string, UtilityValue>
export type Rules = Record<string, RuleValue>

export interface Semantics {
  [key: string]: TokenValue | Semantics
}

export interface DesignDefinition {
  tokens?: Tokens
  semantics?: Semantics
  utilities?: Utilities
  components?: Record<string, ComponentDefinition>
  extends?: DesignDefinition
}

export interface ComponentDefinition {
  ui: string
  tokens?: Tokens
  semantics?: Semantics
  utilities?: Utilities
  rules?: Rules
  extends?: ComponentDefinition
}
