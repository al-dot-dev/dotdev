import { inject, type InjectionKey, provide } from 'vue'

export function createContext<T, A extends unknown[]>(factory: (...args: A) => T) {
  const key: InjectionKey<T> = Symbol('navigation-context')

  function use(...args: A | []): T {
    return inject(key, null) ?? factory(...(args as A))
  }

  function provideContext(value: T): T {
    provide(key, value)
    return value
  }

  return [use, provideContext] as const
}
