<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IconButton, ScrollArea, SelectButton, useClipboard } from '@dotdev/ui-kit'
import DocBlock from './DocBlock.vue'
import DocCard from './DocCard.vue'
import DocCode from './DocCode.vue'
import { type DocExampleResult } from '../define'

interface Props {
  example: DocExampleResult
}

const props = defineProps<Props>()

const preview = computed(() => props.example.preview)
const codes = computed(() => props.example.codes)

const activeTab = ref(preview.value ? 'Example' : 'Code')
const tabs = computed(() => [...(preview.value ? ['Example'] : []), ...(codes.value.length ? ['Code'] : [])])

const activeFileName = ref(codes.value[0]?.file)
const activeCode = computed(() => codes.value.find((code) => code.file === activeFileName.value))
const files = computed(() => codes.value.map((code) => code.file))
const showFiles = computed(() => activeTab.value === 'Code' && files.value.length > 1)

const { copy, copied } = useClipboard(() => activeCode.value?.code)

const isGridVisible = ref(false)
</script>

<template>
  <DocBlock :desc="example.description" :title="example.title" class="doc-example">
    <div class="doc-example__header">
      <SelectButton
        v-if="tabs.length > 1"
        v-model="activeTab"
        :items="tabs"
        class="doc-example__toggle"
        variant="outlined"
      />

      <div class="doc-example__space" />

      <IconButton
        :class="isGridVisible ? 'text-brand' : 'text-muted'"
        icon="grid"
        @click="isGridVisible = !isGridVisible"
      />
      <IconButton :icon="copied ? 'check' : 'copy'" aria-label="Copy source" @click="copy()" />
    </div>

    <DocCard class="doc-example__body">
      <SelectButton
        v-if="showFiles"
        v-model="activeFileName"
        :items="files"
        class="doc-example__toggle"
        size="sm"
        variant="soft"
      />

      <ScrollArea class="doc-example__scroll">
        <div
          v-if="example.preview"
          v-show="activeTab === 'Example'"
          :class="{ 'doc-bg-grid': isGridVisible }"
          class="doc-example__canvas"
        >
          <div class="doc-example__canvas-inner">
            <component :is="example.preview" />
          </div>
        </div>

        <DocCode
          v-if="activeCode"
          v-show="activeTab === 'Code'"
          :key="activeCode.file"
          :code="activeCode.code"
          :lang="activeCode.ext"
        />
      </ScrollArea>
    </DocCard>
  </DocBlock>
</template>
