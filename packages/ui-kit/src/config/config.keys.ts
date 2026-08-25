import type { InjectionKey } from 'vue'
import type { UiKitConfigWithTheme } from './config.types'

export const UI_KIT_CONFIG_KEY: InjectionKey<Map<string, UiKitConfigWithTheme>> = Symbol('dotdev-ui-config')
export const UI_KIT_NAMESPACE_KEY: InjectionKey<string> = Symbol('dotdev-ui-namespace')
