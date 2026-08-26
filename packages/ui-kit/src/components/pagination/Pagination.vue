<script lang="ts" setup>
import { computed } from 'vue'
import { clamp, Icon, useUiKit } from '@dotdev/ui-kit'
import type { UIPaginationEmits, UIPaginationProps, UIPaginationSlots } from './pagination.types.ts'
import { PAGINATION_ELLIPSIS, usePagination } from './usePagination.ts'
import { paginationStyle } from '@dotdev/theme'

const UI_NAME = 'pagination'

defineSlots<UIPaginationSlots>()
const emits = defineEmits<UIPaginationEmits>()
const props = withDefaults(defineProps<UIPaginationProps>(), {
  ui: UI_NAME,
  size: 'md',
  total: 0,
  pageSize: 10,
  siblingCount: 1,
  ariaLabel: 'Pagination',
})

const model = defineModel<number>({ default: 1 })

const { ui, bem } = useUiKit(UI_NAME, props, paginationStyle)

const rootClass = computed(() => {
  const { size, disabled } = ui
  return bem([size], { disabled })
})

const pageCount = computed(() => Math.max(1, Math.ceil(ui.total / Math.max(1, ui.pageSize))))
const currentPage = computed(() => clamp(Math.round(model.value) || 1, 1, pageCount.value))

const { items } = usePagination({
  pageCount: () => pageCount.value,
  currentPage: () => currentPage.value,
  siblingCount: () => ui.siblingCount,
})

const prevDisabled = computed(() => currentPage.value <= 1)
const nextDisabled = computed(() => currentPage.value >= pageCount.value)

function go(page: number) {
  if (ui.disabled || page < 1 || page > pageCount.value || page === currentPage.value) return

  model.value = page
  emits('change', page)
}
</script>

<template>
  <nav :aria-label="ui.ariaLabel" :class="rootClass" v-bind="el">
    <ul :class="bem('list')">
      <li>
        <button
          :aria-label="'Go to previous page'"
          :class="bem('item')"
          :disabled="ui.disabled || prevDisabled || undefined"
          type="button"
          @click="go(currentPage - 1)"
        >
          <slot :disabled="prevDisabled" name="prev">
            <Icon name="chevron-left" />
          </slot>
        </button>
      </li>

      <li v-for="(item, index) in items" :key="index">
        <span v-if="item === PAGINATION_ELLIPSIS" :class="bem('ellipsis')">
          <slot name="ellipsis">…</slot>
        </span>
        <button
          v-else
          :aria-current="item === currentPage ? 'page' : undefined"
          :aria-label="`Go to page ${item}`"
          :class="bem('item', { selected: item === currentPage })"
          :disabled="ui.disabled || undefined"
          type="button"
          @click="go(item)"
        >
          <slot :page="item" :selected="item === currentPage" name="item">{{ item }}</slot>
        </button>
      </li>

      <li>
        <button
          :aria-label="'Go to next page'"
          :class="bem('item')"
          :disabled="ui.disabled || nextDisabled || undefined"
          type="button"
          @click="go(currentPage + 1)"
        >
          <slot :disabled="nextDisabled" name="next">
            <Icon name="chevron-right" />
          </slot>
        </button>
      </li>
    </ul>
  </nav>
</template>
