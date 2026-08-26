import type { PartialNested, UiKitConfig, UiKitConfigComponents } from '@dotdev/ui-kit'

type UiKitComponents = PartialNested<UiKitConfigComponents>

function mergeComponents(base?: UiKitComponents, override?: UiKitComponents): UiKitComponents | undefined {
  if (override === undefined) return undefined

  const baseEntries = Object.entries(base ?? {})
  const overrideEntries = Object.entries(override).map(([key, overrideProps]) => {
    if (overrideProps === undefined) {
      return [key, undefined]
    }

    const baseProps = ((base ?? {}) as Record<string, object>)[key]
    return [key, { ...baseProps, ...overrideProps }]
  })

  return Object.fromEntries([...baseEntries, ...overrideEntries])
}

export function mergeUiKitConfig(base: UiKitConfig, override: UiKitConfig): UiKitConfig {
  const merged: UiKitConfig = { ...base, ...override }

  if (override.components !== undefined) {
    merged.components = mergeComponents(base.components, override.components)
  }

  if (override.icons !== undefined) {
    merged.icons = { ...(base.icons ?? {}), ...override.icons }
  }

  return merged
}
