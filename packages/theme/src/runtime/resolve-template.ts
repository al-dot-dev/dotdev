import { NAMESPACE } from './constants'

export function resolveTemplate(template: string, namespace: string) {
  return template.replaceAll(NAMESPACE, namespace)
}
