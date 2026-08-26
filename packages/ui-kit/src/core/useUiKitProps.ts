import { type ComponentInternalInstance, getCurrentInstance } from 'vue'
import type { UiKitBaseProps, UiKitConfig, UiKitConfigComponents } from '@dotdev/ui-kit'

type UiKitComponentKeys = keyof UiKitConfigComponents

export function toKebabCase(str = '') {
  if (toKebabCase.cache.has(str)) {
    return toKebabCase.cache.get(str)!
  }

  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()

  toKebabCase.cache.set(str, kebab)

  return kebab
}

toKebabCase.cache = new Map<string, string>()

function propIsDefined(vnode: ComponentInternalInstance | null, prop: string) {
  const props = vnode?.vnode.props
  if (!props) return false

  return props[prop] !== undefined || props[toKebabCase(prop)] !== undefined
}

interface UiKitPropsOptions<P extends UiKitBaseProps> {
  component: UiKitComponentKeys
  props: P
  namespace: string
  config: UiKitConfig
}

export function useUiKitProps<P extends UiKitBaseProps>(options: UiKitPropsOptions<P>): P {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('[dotdev/ui-kit] useUiKitProps() can only be used inside setup()')

  const { component, props, namespace, config } = options

  const defaults = config.components?.[component] as Partial<P> | undefined

  return new Proxy(props, {
    get(target, _prop, receiver) {
      const prop = _prop as keyof P & string
      const value = Reflect.get(target, prop, receiver)

      if (prop === 'class' || prop === 'style') {
        return [defaults?.[prop], value].filter(Boolean)
      }

      if (propIsDefined(vm, prop)) return value

      if (prop === 'namespace') {
        return namespace
      }

      const configValue = defaults?.[prop]

      if (configValue !== undefined) {
        return configValue
      }

      return value
    },
  })
}
