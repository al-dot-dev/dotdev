import { BaseElementNode, ElementTypes, NodeTypes, RootNode } from '@vue/compiler-core'
import type { Plugin, ViteDevServer } from 'vite'
import { parse } from 'vue/compiler-sfc'
import { type FlexMeta, metaToCss } from './meta-to-css'

export function dotdevUiCss(): Plugin {
  const flexMetas = new Map<string, FlexMeta>()

  let server: ViteDevServer | undefined

  return {
    name: 'dotdev-ui',

    configureServer(_server) {
      server = _server
    },
    handleHotUpdate({ file, server, modules }) {
      if (!file.endsWith('.vue')) {
        return
      }

      const styleModule = [...(server.moduleGraph.getModulesByFile(file) ?? [])].find((module) =>
        module.url.includes('?vue&type=style'),
      )

      if (!styleModule) {
        return
      }

      console.log('STYLE MODULE', styleModule.url, styleModule.transformResult)

      return [...modules, styleModule]
    },

    load(id) {
      if (id.includes('?vue&type=style')) {
        console.log('STYLE LOAD', id)
        // return { code: '' }
      }
    },

    transform: {
      order: 'pre',
      filter: {
        id: /\.vue$/,
        code: /<Flex[\s>]/,
      },
      handler(code, rawId) {
        console.log('DOTDEV TRANSFORM', rawId)

        const [path, queryStr = ''] = rawId.split('?')
        // не трогаем style/script/template подзапросы — их собирает @vitejs/plugin-vue
        if (queryStr.includes('type=')) return
        if (!path.endsWith('.vue')) return

        const { descriptor } = parse(code)
        if (!descriptor.template?.ast) return

        const meta = collectFlexMeta(descriptor.template.ast as RootNode, path)
        if (!meta) return

        const css = metaToCss(meta)
        if (!css) return

        flexMetas.set(path, meta)
        server?.ws.send({
          type: 'custom',
          event: 'dotdev:log',
          data: { code, css },
        })

        return {
          // code,
          code: `${code}\n${css}`,
          map: null,
        }
      },
    },
  }

  function collectFlexMeta(root: RootNode, file: string): FlexMeta | null {
    const props: Record<string, string> = {}
    let className = ''

    walk(root, (node) => {
      const el = node as BaseElementNode
      if (!isFlex(el)) return

      for (const prop of el.props) {
        if (prop.type !== NodeTypes.ATTRIBUTE) {
          continue
        }

        if (prop.name === 'class') {
          className = prop.value?.content.split(' ')[0] ?? ''
          continue
        }

        props[prop.name] = prop.value?.content ?? ''
      }
    })

    return Object.keys(props).length ? { className, props } : null
  }

  function isFlex(node: BaseElementNode): boolean {
    return (
      node.type === NodeTypes.ELEMENT &&
      node.tagType === ElementTypes.COMPONENT &&
      (node.tag === 'Flex' || node.tag.endsWith(':Flex'))
    )
  }

  function walk(node: any, visit: (node: BaseElementNode) => void): void {
    if (!node) {
      return
    }

    visit(node)

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        walk(child, visit)
      }
    }
  }
}
