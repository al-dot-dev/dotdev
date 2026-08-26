import type { Component } from 'vue'
import type { DefineThemeConfig, ThemeAPI } from '@dotdev/theme'
import type {
  PartialNested,
  UIAccordionProps,
  UIAvatarProps,
  UIBreadcrumbsProps,
  UIButtonProps,
  UICheckboxProps,
  UIDialogProps,
  UIDividerProps,
  UIGroupAddonProps,
  UIGroupProps,
  UIIconButtonProps,
  UIIconProps,
  UIInputProps,
  UiKitIcon,
  UiKitNamespace,
  UILayoutContentProps,
  UILayoutHeaderProps,
  UILayoutProps,
  UILayoutSidebarProps,
  UIListBoxProps,
  UIMenuItemProps,
  UIMenuProps,
  UIMessageProps,
  UIPaginationProps,
  UIProgressProps,
  UIRadioProps,
  UIScrollAreaProps,
  UISelectButtonProps,
  UISelectProps,
  UISkeletonProps,
  UISwitchProps,
  UITableProps,
  UITabsProps,
  UITagProps,
  UITextareaProps,
} from '@dotdev/ui-kit'
import type { UIDrawerProps } from '@dotdev/ui-kit/components/drawer'

export interface UiKitConfigComponents {
  accordion: UIAccordionProps
  avatar: UIAvatarProps
  breadcrumbs: UIBreadcrumbsProps
  button: UIButtonProps
  dialog: UIDialogProps
  drawer: UIDrawerProps
  'icon-button': UIIconButtonProps
  'select-button': UISelectButtonProps
  menu: UIMenuProps
  'menu-item': UIMenuItemProps
  input: UIInputProps
  group: UIGroupProps
  'group-addon': UIGroupAddonProps
  listbox: UIListBoxProps
  select: UISelectProps
  switch: UISwitchProps
  textarea: UITextareaProps
  tag: UITagProps
  message: UIMessageProps
  divider: UIDividerProps
  checkbox: UICheckboxProps
  radio: UIRadioProps
  icon: UIIconProps
  'scroll-area': UIScrollAreaProps
  table: UITableProps
  skeleton: UISkeletonProps
  progress: UIProgressProps
  pagination: UIPaginationProps
  layout: UILayoutProps
  'layout-sidebar': UILayoutSidebarProps
  'layout-header': UILayoutHeaderProps
  'layout-content': UILayoutContentProps
  tabs: UITabsProps
}

export interface UiKitConfig {
  namespace?: UiKitNamespace
  theme?: Omit<DefineThemeConfig, 'namespace'>
  components?: PartialNested<UiKitConfigComponents>
  icons?: Partial<Record<UiKitIcon, Component>>
}

export interface UiKitConfigWithTheme {
  config: UiKitConfig
  theme: ThemeAPI
}
