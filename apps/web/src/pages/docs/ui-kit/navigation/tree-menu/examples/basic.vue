<script lang="ts" setup>
import { Collapse, Floating, Menu2 as Menu } from '@dotdev/ui-kit'
import { ref } from 'vue'

interface Item {
  label: string
  value: string
  icon?: string
  kind?: 'collapse' | 'floating'
  children?: Item[]
  disabled?: boolean
  expanded?: boolean
}

const items: Item[] = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    disabled: true,
  },
  {
    label: 'Projects',
    value: 'projects',
    kind: 'collapse',
    children: [
      {
        label: 'Website redesign',
        value: 'website-redesign',
        disabled: true,
        children: [
          { label: 'Overview', value: 'website-overview' },
          { label: 'Tasks', value: 'website-tasks' },
          { label: 'Settings', value: 'website-settings' },
        ],
      },
      {
        label: 'Mobile app',
        value: 'mobile-app',
        children: [
          { label: 'Overview', value: 'mobile-overview' },
          { label: 'Tasks', value: 'mobile-tasks', disabled: true },
          { label: 'Settings', value: 'mobile-settings' },
        ],
      },
    ],
  },
  {
    label: 'Team',
    value: 'team',
    children: [
      { label: 'Members', value: 'team-members' },
      { label: 'Invitations', value: 'team-invitations' },
    ],
  },
  {
    label: 'Settings',
    value: 'settings',
    kind: 'floating',
    children: [
      { label: 'General', value: 'settings-general' },
      { label: 'Security', value: 'settings-security' },
      { label: 'Notifications', value: 'settings-notifications' },
    ],
  },
  {
    label: 'Help',
    value: 'help',
  },
]

const model = ref<string[]>([])

function toggleModel(item: Item) {
  if (!model.value.includes(item.value)) {
    model.value.push(item.value)
  } else {
    model.value = model.value.filter((v) => v !== item.value)
  }
}

function isActive(item: Item) {
  return model.value.includes(item.value)
}

function isDisabled(item: Item) {
  return !!item.disabled
}
</script>

<template>
  <Menu :disabled-item="isDisabled" :items="items" children-key="children" label-key="label" @command="toggleModel">
    <template #children="{ props, item, itemEl }">
      <Collapse v-if="item.kind === 'collapse'" :model-value="isActive(item)">
        <Menu v-bind="props" />
      </Collapse>

      <Floating
        v-if="item.kind === 'floating'"
        #default="{ style, ref }"
        :target="itemEl"
        auto-update
        placement="right-start"
      >
        <teleport to="body">
          <div
            v-if="isActive(item)"
            :ref="ref"
            :style="style"
            class="bg-background border border-default rounded-md p-1"
          >
            <Menu v-bind="props" />
          </div>
        </teleport>
      </Floating>
    </template>
  </Menu>

  <!--  <TreeMenu-->
  <!--    :disabled-item="isDisabled"-->
  <!--    :expanded-item="isActive"-->
  <!--    :items="items"-->
  <!--    children-key="children"-->
  <!--    class="w-64"-->
  <!--    label-key="label"-->
  <!--    @collapse="toggleModel"-->
  <!--    @expand="toggleModel"-->
  <!--    @item:click="toggleModel"-->
  <!--  >-->
  <!--    <template #label="{ label, item }">-->
  <!--      <span :class="{ 'opacity-50': item.disabled }" class="font-bold">{{ label }}</span>-->
  <!--    </template>-->

  <!--    <template #children="{ NestedMenu, element, item }">-->
  <!--      <Collapse v-if="item.kind === 'collapse'" :model-value="isActive(item)">-->
  <!--        <component :is="NestedMenu" />-->
  <!--      </Collapse>-->

  <!--      <Floating-->
  <!--        v-if="item.kind === 'floating'"-->
  <!--        #default="{ style, ref }"-->
  <!--        :target="element"-->
  <!--        auto-update-->
  <!--        placement="right-start"-->
  <!--      >-->
  <!--        <teleport to="body">-->
  <!--          <div-->
  <!--            v-if="isActive(item)"-->
  <!--            :ref="ref"-->
  <!--            :style="{ ...style, zIndex: 9999 }"-->
  <!--            class="w-45 bg-background p-1 radius-lg border border-default"-->
  <!--          >-->
  <!--            <component :is="NestedMenu" />-->
  <!--          </div>-->
  <!--        </teleport>-->
  <!--      </Floating>-->
  <!--    </template>-->
  <!--  </TreeMenu>-->
</template>
