import {
  asTemplateRef,
  UI_KIT_CONFIG_KEY,
  UI_KIT_NAMESPACE_KEY,
  type UiKitBaseProps,
  type UiKitConfigComponents,
  useUiKitBem,
  useUiKitProps,
} from '@dotdev/ui-kit'
import { inject } from 'vue'

type UiKitComponentKeys = keyof UiKitConfigComponents

export function useUiKit<P extends UiKitBaseProps>(component: UiKitComponentKeys, props: P, styles?: string) {
  const overriddenNs = inject(UI_KIT_NAMESPACE_KEY, null)
  const namespace = overriddenNs ?? props.namespace

  if (!namespace || !props.ui) {
    throw new Error(`[dotdev/ui-kit] Both namespace and ui are required`)
  }

  const provided = inject(UI_KIT_CONFIG_KEY)
  const state = provided?.get(namespace)

  if (!state) {
    throw new Error(`[dotdev/ui-kit] config not found for namespace "${namespace}"`)
  }

  const uiKitProps = useUiKitProps({ component, props, namespace, config: state.config })
  const bem = useUiKitBem(uiKitProps, namespace)

  if (styles && component === props.ui) {
    const theme = state.theme
    const components = (state.theme.config?.components ?? {}) as any
    const cssVars = components[component]

    if (cssVars) theme.injectCSS(theme.toCSS(cssVars, component), `${namespace}-${component}-vars`)
    theme.injectCSS(theme.templateToCSS(styles, namespace), `${namespace}-${component}`)
  }

  return {
    ui: uiKitProps,
    tui: asTemplateRef(uiKitProps),
    bem,
    config: state.config,
    theme: state.theme,
  }
}
