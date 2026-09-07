import { inject, type InjectionKey, provide } from 'vue'

export function createContext<F extends (...args: any[]) => any>(factory: F) {
  type T = ReturnType<F>

  const key: InjectionKey<T> = Symbol('context')

  function get(): T {
    const context = inject(key)

    if (context === undefined) {
      throw new Error('Context is not provided')
    }

    return context
  }

  function getOrCreate(...args: Parameters<F>): T {
    return inject(key, null) ?? factory(...args)
  }

  function create(...args: Parameters<F>): T {
    return factory(...args)
  }

  function provideContext(value: T): T {
    provide(key, value)
    return value
  }

  return {
    get,
    getOrCreate,
    create,
    provide: provideContext,
  }
}
