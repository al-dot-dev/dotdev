import { inject, type InjectionKey, provide } from 'vue'

/**
 * Generic Vue context factory.
 */
export function createContext<T, A extends unknown[]>(factory: (...args: A) => T) {
  const key: InjectionKey<T> = Symbol('context')

  function useContext(...args: A | []): T {
    return inject(key, null) ?? factory(...(args as A))
  }

  function provideContext(value: T): T {
    const context = value
    provide(key, context)
    return context
  }

  return [useContext, provideContext] as const
}
