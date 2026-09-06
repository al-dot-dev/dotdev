import type { RouteRecordNormalized } from 'vue-router'
import type { UIMenuItem } from '@dotdev/ui-kit'

interface Node {
  segment: string
  path: string
  route?: RouteRecordNormalized
  children: Map<string, Node>
}

interface StudioMenuItem extends UIMenuItem {
  children: UIMenuItem[]
}

function compareNodes(a: Node, b: Node): number {
  const aOrder = typeof a.route?.meta.order === 'number' ? a.route.meta.order : Number.POSITIVE_INFINITY
  const bOrder = typeof b.route?.meta.order === 'number' ? b.route.meta.order : Number.POSITIVE_INFINITY
  return aOrder - bOrder || a.segment.localeCompare(b.segment)
}

export function routesToMenu(routes: RouteRecordNormalized[]): StudioMenuItem[] {
  const root: Node = {
    segment: '',
    key: '',
    children: new Map(),
  }

  for (const route of routes) {
    if (route.path === '/') continue
    if (route.path === '/docs') continue

    const segments = route.path.split('/').filter((s) => s && s !== 'docs')

    let node = root
    let currentPath = route.path.includes('/docs') ? '/docs' : ''

    for (const segment of segments) {
      currentPath += `/${segment}`

      if (!node.children.has(segment)) {
        node.children.set(segment, {
          segment,
          key: currentPath,
          children: new Map(),
        })
      }

      node = node.children.get(segment)!
    }

    node.route = route
  }

  function flatten(node: Node, level: number, items: UIMenuItem[]) {
    const children = [...node.children.values()].sort(compareNodes)

    for (const child of children) {
      if (child.route) {
        items.push({
          label: String(child.route.name ?? child.segment),
          to: child.path,
          kind: child.route.meta.kind,
        })
      }

      flatten(child, level + 1, items)
    }
  }

  const result: (UIMenuItem & { children: UIMenuItem[] })[] = []

  for (const child of [...root.children.values()].sort(compareNodes)) {
    const children: UIMenuItem[] = []

    flatten(child, 1, children)

    result.push({
      label: String(child.route?.name ?? child.segment),
      to: child.route ? child.path : undefined,
      kind: child.route?.meta.kind,
      icon: child.route?.meta.icon,
      children,
    })
  }

  return result
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $studioMenu: StudioMenuItem[]
  }
}

declare module '@dotdev/ui-kit' {
  interface UIMenuItem {
    to?: string
  }
}
