const VIRTUAL_CSS_PREFIX = '\0dotdev-ui-css:'

export function virtualCssId(filePath: string): string {
  return `${VIRTUAL_CSS_PREFIX}${filePath}.css`
}

export function virtualCssFilePath(id: string): string | null {
  if (!id.startsWith(VIRTUAL_CSS_PREFIX) || !id.endsWith('.css')) return null
  return id.slice(VIRTUAL_CSS_PREFIX.length, -'.css'.length)
}

export function isVirtualCss(id: string): boolean {
  return virtualCssFilePath(id) !== null
}
