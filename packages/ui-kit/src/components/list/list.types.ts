import type { Component } from 'vue'

export interface UIListProps<T = unknown> {
  items?: T[]
  labelKey?: StringKeys<T>
  itemKey?: StringKeys<T>
  childrenKey?: ArrayKeys<T>
}

export interface UIListSharedProps<T = unknown, S extends object = object> extends UIListProps<T> {
  is?: string | Component
  scope?: (item: T, index: number) => S
}

export interface UIListSlots<T = unknown, S extends object = object> {
  default(scope: UIListSlotScope<T, S>): unknown
}

export type UIListSlotScope<T = unknown, S extends object = object> = S & {
  item: T
  index: number
  key: string
  label: string
  children: T[]
}

type StringKeys<T> = {
  [K in keyof T]-?: T[K] extends string ? K : never
}[keyof T]

type ArrayKeys<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends T[] ? K : never
}[keyof T]
