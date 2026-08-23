import { computed, toValue } from 'vue'
import { clamp } from '@dotdev/ui-kit'

export const PAGINATION_ELLIPSIS = 'ellipsis' as const

export type UIPaginationRangeItem = number | typeof PAGINATION_ELLIPSIS

export interface UsePaginationOptions {
  pageCount: () => number
  currentPage: () => number
  siblingCount?: () => number
}

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index)
}

export function usePagination(options: UsePaginationOptions) {
  const items = computed<UIPaginationRangeItem[]>(() => {
    const pageCount = Math.max(1, Math.floor(toValue(options.pageCount)) || 1)
    const current = clamp(Math.round(toValue(options.currentPage)) || 1, 1, pageCount)
    const siblings = Math.max(0, Math.floor(toValue(options.siblingCount) ?? 1))

    // first, last, current, two ellipsis slots and one sibling on each side
    const totalSlots = siblings * 2 + 5

    if (pageCount <= totalSlots) return range(1, pageCount)

    const leftSibling = Math.max(current - siblings, 1)
    const rightSibling = Math.min(current + siblings, pageCount)

    const showLeftEllipsis = leftSibling > 2
    const showRightEllipsis = rightSibling < pageCount - 1

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftCount = 3 + siblings * 2
      return [...range(1, leftCount), PAGINATION_ELLIPSIS, pageCount]
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightCount = 3 + siblings * 2
      return [1, PAGINATION_ELLIPSIS, ...range(pageCount - rightCount + 1, pageCount)]
    }

    return [1, PAGINATION_ELLIPSIS, ...range(leftSibling, rightSibling), PAGINATION_ELLIPSIS, pageCount]
  })

  return { items }
}
