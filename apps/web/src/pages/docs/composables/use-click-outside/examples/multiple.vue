<script lang="ts" setup>
import { useClickOutside } from '@dotdev/ui-kit'
import { ref } from 'vue'

const options = ['Apple', 'Banana', 'Cherry', 'Grape']

const query = ref('')
const open = ref(false)
const input = ref<HTMLInputElement | null>(null)
const listbox = ref<HTMLElement | null>(null)

useClickOutside([input, listbox], () => {
  open.value = false
})
</script>

<template>
  <div>
    <input
      ref="input"
      v-model="query"
      class="w-56 rounded-lg border border-default bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
      placeholder="Focus me and pick a fruit"
      @focus="open = true"
    >

    <ul
      v-if="open"
      ref="listbox"
      class="mt-1 w-56 overflow-hidden rounded-xl border border-default bg-surface p-1 text-sm"
    >
      <li
        v-for="option in options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))"
        :key="option"
        class="cursor-pointer rounded-lg px-3 py-1.5 hover:bg-neutral-soft-hover"
        @click="query = option; open = false"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
