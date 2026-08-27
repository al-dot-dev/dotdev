<script lang="ts" setup>
import { Button, Group, GroupAddon, Input, Select } from '@dotdev/ui-kit'

const options = ['Option A', 'Option B']
</script>

<template>
  <div class="flex flex-col gap-4">
    <Group class="-space-x-px">
      <GroupAddon label="$" />
      <Input placeholder="Amount" />
      <GroupAddon label="USD" />
    </Group>

    <Group>
      <GroupAddon class="-mr-px">
        <span class="text-muted">⌘K</span>
      </GroupAddon>
      <Input placeholder="Search..." />
      <Button icon="filter" />
    </Group>

    <Group axis="y" class="-space-y-px">
      <Group class="-space-x-px">
        <GroupAddon class="w-20" label="From" />
        <Input placeholder="Start date" />
        <GroupAddon label="To" />
        <Input placeholder="End date" />
      </Group>

      <Group class="w-full">
        <GroupAddon class="w-20 -mr-px" label="Select" />
        <Select :items="options" class="flex-1" placeholder="Choose" />
      </Group>
    </Group>
  </div>
</template>
