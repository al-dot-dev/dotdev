import type { UIListProps } from '@dotdev/ui-kit'

export function listBind<T>(props: UIListProps<T>): UIListProps<T> {
  return {
    items: props.items,
    labelKey: props.labelKey,
    itemKey: props.itemKey,
    childrenKey: props.childrenKey,
  }
}
