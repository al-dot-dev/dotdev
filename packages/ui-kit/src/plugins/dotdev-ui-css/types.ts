import type { boxCoreKeys, boxBreakpoints, boxVariants } from '../../components/primitives/constants.ts'

/**
 * Конфигурация плагина.
 */
export interface DotdevUiCssOptions {
  /**
   * Включить автоматическую привязку класса (когда `$class` не задан).
   * Класс-имя генерируется детерминированно из пропсов компонента.
   * @default true
   */
  autoClass?: boolean

  /**
   * Множество имён компонентов семейства Box (без неймспейса), которые плагин
   * распознаёт как стилевые примитивы. `Box` и пресеты к нему добавляются сюда.
   * @default ['Box']
   */
  components?: string[]
}

export interface CollectOptions {
  /** Исходный код SFC */
  code: string
}

/**
 * Одна стилевая связка, найденная в template: имя класса + список пропсов.
 */
export interface BoxMeta {
  /** Имя класса-селектора (из `$class`, либо авто-хеш). */
  className: string
  /**
   * Стилевые пропсы как `имя -> значение`. Ключ может иметь префикс
   * breakpoint/variant, напр. `sm:p` или `hover:bg`.
   */
  props: Record<string, string>
}

/** Разобранный ключ пропса: breakpoint-префикс + variant-префикс + базовое имя. */
export interface ParsedBoxKey {
  /** Breakpoint-префикс (напр. `sm`), либо `null`. */
  breakpoint: (typeof boxBreakpoints)[number] | null
  /** Variant-префикс (напр. `hover`), либо `null`. */
  variant: (typeof boxVariants)[number] | null
  /** Базовое имя пропса (из boxCoreKeys). */
  key: (typeof boxCoreKeys)[number]
}
