import type { DesignDefinition } from '../types/model.ts'
import type { BuildContext } from './types.ts'

export function createContext(design: DesignDefinition): BuildContext {
  return {
    design,

    tokens: new Map(),
    semantics: new Map(),
    utilities: new Map(),
    components: new Map(),

    diagnostics: [],
    graph: {
      edges: new Map(),
    },
  }
}
