import type { App, Component, Plugin } from 'vue'
import {
  mergeUiKitConfig,
  UI_KIT_CONFIG_KEY,
  UI_KIT_NAMESPACE_KEY,
  type UiKitConfig,
  type UiKitConfigWithTheme,
} from '@dotdev/ui-kit'
import { createTheme } from '@dotdev/theme'

export const DEFAULT_CONFIG: UiKitConfig = {
  namespace: 'd',
}

export function defineUiKitConfig(config: UiKitConfig): UiKitConfig {
  return config
}

export interface UiKitOptions {
  base?: UiKitConfig
  icons?: Record<string, Component>
  configs?: UiKitConfig[]
}

export function createUiKit(options?: UiKitOptions): Plugin {
  const config = options?.base ?? DEFAULT_CONFIG
  const configs = [config, ...(options?.configs ?? [])]
  const sharedIcons = options?.icons
  const configMap = new Map<string, UiKitConfigWithTheme>()

  for (const cfg of configs) {
    const namespace = cfg.namespace ?? DEFAULT_CONFIG.namespace ?? 'd'
    const icons = cfg.icons ?? sharedIcons
    const merged = mergeUiKitConfig(DEFAULT_CONFIG, { ...cfg, icons })
    const theme = createTheme({ namespace, ...cfg.theme })

    configMap.set(namespace, { theme, config: merged })

    const css = theme.toCSS({ ...theme.config.primitives, ...theme.config.semantics })
    theme.injectCSS(css, `${namespace}-theme`)
  }

  return {
    install(app: App) {
      app.provide(UI_KIT_NAMESPACE_KEY, config.namespace ?? DEFAULT_CONFIG.namespace ?? 'd')
      app.provide(UI_KIT_CONFIG_KEY, configMap)
    },
  }
}
