import type { DesignDefinition } from '../types/model.ts'
import { createContext } from './context.ts'
import { collect } from './collect.ts'

export function compile(design: DesignDefinition) {
  const context = createContext(design)
  collect(context)

  return context
}
