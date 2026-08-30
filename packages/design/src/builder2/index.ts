import theme from './config/theme.ts'
import { compile } from './compiler/compile.ts'

console.log(compile(theme as any).components.get('accordion')?.rules)
