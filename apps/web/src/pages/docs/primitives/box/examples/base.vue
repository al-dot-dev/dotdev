<script lang="ts" setup>
import { Box } from '@dotdev/ui-kit'
</script>

<template>
  <Box $class="demo-box" align="stretch" direction="col" display="flex" gap="6" max-w="5xl" w="full">
    <Box
      $class="demo-card-flex"
      align="stretch"
      bg="white"
      border
      borderColor="neutral-200"
      direction="col"
      display="flex"
      gap="3"
      p="6"
      rounded="2xl"
      shadow="sm"
      w="full"
    >
      <p class="font-mono text-[11px] uppercase tracking-wider text-neutral-400">Flex layout</p>
      <Box
        $class="demo-flex-main"
        align="center"
        bg="neutral-50"
        border
        borderColor="neutral-300"
        borderStyle="dashed"
        direction="row"
        display="flex"
        gap="3"
        justify="between"
        md:justify="end"
        p="4"
        rounded="lg"
        sm:gap="6"
        wrap
      >
        <Box $class="demo-flex-chip-a" bg="indigo-500" p="3" rounded="lg">
          <span class="text-sm font-medium text-white">A</span>
        </Box>
        <Box $class="demo-flex-chip-b" bg="sky-500" p="3" rounded="lg">
          <span class="text-sm font-medium text-white">B</span>
        </Box>
        <Box $class="demo-flex-chip-c" bg="emerald-500" p="3" rounded="lg">
          <span class="text-sm font-medium text-white">C</span>
        </Box>
      </Box>
    </Box>

    <Box
      $class="demo-card-children"
      align="stretch"
      bg="white"
      border
      borderColor="neutral-200"
      direction="col"
      display="flex"
      gap="3"
      p="6"
      rounded="2xl"
      shadow="sm"
      w="full"
    >
      <p class="font-mono text-[11px] uppercase tracking-wider text-neutral-400">Flex item control</p>
      <Box $class="demo-flex-children" align="center" direction="row" display="flex" gap="3" h="20" wrap>
        <Box $class="demo-flex-grow" basis="0" bg="violet-500" grow p="3" rounded="lg">
          <span class="text-sm font-medium text-white">grow</span>
        </Box>
        <Box $class="demo-flex-shrink" bg="teal-400" p="3" rounded="lg" shrink="0">
          <span class="text-sm font-medium text-white">shrink-0</span>
        </Box>
        <Box $class="demo-flex-self" bg="amber-400" p="3" rounded="lg" self="end">
          <span class="text-sm font-medium text-neutral-900">self-end</span>
        </Box>
      </Box>
      <Box $class="demo-flex-order" direction="row" display="flex" gap="3">
        <Box $class="demo-order-first" bg="pink-500" order="2" p="3" rounded="lg">
          <span class="text-sm font-medium text-white">first</span>
        </Box>
        <Box $class="demo-order-second" bg="cyan-500" order="1" p="3" rounded="lg">
          <span class="text-sm font-medium text-white">second</span>
        </Box>
      </Box>
    </Box>

    <Box
      $class="demo-card-grid"
      align="stretch"
      bg="white"
      border
      borderColor="neutral-200"
      direction="col"
      display="flex"
      gap="3"
      p="6"
      rounded="2xl"
      shadow="sm"
      w="full"
    >
      <p class="font-mono text-[11px] uppercase tracking-wider text-neutral-400">Grid</p>
      <Box $class="demo-grid" cols="2" display="grid" gap="3" placeItems="center" sm:cols="3">
        <Box $class="demo-grid-a" bg="indigo-500" center display="flex" rounded="xl" size="10">
          <span class="text-sm font-medium text-white">1</span>
        </Box>
        <Box $class="demo-grid-b" bg="sky-500" center display="flex" rounded="xl" size="10">
          <span class="text-sm font-medium text-white">2</span>
        </Box>
        <Box $class="demo-grid-c" bg="emerald-500" center display="flex" rounded="xl" size="10">
          <span class="text-sm font-medium text-white">3</span>
        </Box>
        <Box $class="demo-grid-d" bg="amber-400" center display="flex" rounded="xl" size="10">
          <span class="text-sm font-medium text-neutral-900">4</span>
        </Box>
        <Box $class="demo-grid-e" bg="rose-500" center display="flex" rounded="xl" size="10">
          <span class="text-sm font-medium text-white">5</span>
        </Box>
        <Box $class="demo-grid-f" bg="violet-500" center display="flex" rounded="xl" size="10">
          <span class="text-sm font-medium text-white">6</span>
        </Box>
      </Box>
    </Box>

    <Box
      $class="demo-card-spacing"
      align="stretch"
      bg="white"
      border
      borderColor="neutral-200"
      direction="col"
      display="flex"
      gap="3"
      p="6"
      rounded="2xl"
      shadow="sm"
      w="full"
    >
      <p class="font-mono text-[11px] uppercase tracking-wider text-neutral-400">Spacing & size</p>
      <Box $class="demo-box-space" align="end" direction="row" display="flex" gap="4" wrap>
        <Box $class="demo-size-a" bg="cyan-500" center display="flex" rounded="xl" size="12">
          <span class="text-xs font-medium text-white">size</span>
        </Box>
        <Box $class="demo-size-b" bg="lime-500" center display="flex" h="12" rounded="xl" w="24">
          <span class="text-xs font-medium text-neutral-900">w / h</span>
        </Box>
        <Box $class="demo-size-c" bg="orange-400" center display="flex" px="6" py="3" rounded="full">
          <span class="text-sm font-medium text-white">p</span>
        </Box>
        <Box $class="demo-dots" display="flex" spaceX="3">
          <Box $class="demo-dot-1" bg="slate-400" rounded="full" size="3" />
          <Box $class="demo-dot-2" bg="sky-400" rounded="full" size="3" />
          <Box $class="demo-dot-3" bg="emerald-400" rounded="full" size="3" />
          <Box $class="demo-dot-4" bg="rose-400" rounded="full" size="3" />
        </Box>
        <Box $class="demo-size-d" bg="amber-100" border borderColor="amber-300" m="3" maxW="xs" p="3" rounded="md">
          <span class="text-sm font-medium text-amber-800">max-w</span>
        </Box>
      </Box>
    </Box>

    <Box
      $class="demo-card-shape"
      align="stretch"
      bg="white"
      border
      borderColor="neutral-200"
      direction="col"
      display="flex"
      gap="3"
      p="6"
      rounded="2xl"
      shadow="sm"
      w="full"
    >
      <p class="font-mono text-[11px] uppercase tracking-wider text-neutral-400">Shape & style</p>
      <Box $class="demo-box-shapes" align="center" direction="row" display="flex" gap="4" wrap>
        <Box $class="demo-shape-circle" bg="fuchsia-500" rounded="full" size="12" />
        <Box
          $class="demo-shape-dashed"
          bg="white"
          border
          borderColor="slate-400"
          borderStyle="dashed"
          p="4"
          rounded="2xl"
        >
          <span class="text-sm font-medium text-neutral-700">dashed</span>
        </Box>
        <Box $class="demo-shape-ring" bg="orange-400" center display="flex" ring="4" rounded="xl" size="12">
          <span class="text-sm font-medium text-white">ring</span>
        </Box>
        <Box $class="demo-shape-shadow" bg="white" border borderColor="neutral-200" p="4" rounded="xl" shadow="lg">
          <span class="text-sm font-medium text-neutral-700">shadow</span>
        </Box>
        <Box $class="demo-shape-opacity" bg="black" center display="flex" opacity="60" p="4" rounded="xl">
          <span class="text-sm font-medium text-white">opacity</span>
        </Box>
        <Box $class="demo-shape-cursor" bg="indigo-100" cursor="pointer" p="4" rounded="xl" select="none">
          <span class="text-sm font-medium text-indigo-700">cursor / select</span>
        </Box>
        <Box $class="demo-shape-overflow" h="12" overflow="hidden" rounded="xl" w="44">
          <Box $class="demo-shape-overflow-inner" bg="rose-500" rounded="lg" size="16" />
        </Box>
      </Box>
    </Box>

    <Box
      $class="demo-card-state"
      align="stretch"
      bg="white"
      border
      borderColor="neutral-200"
      direction="col"
      display="flex"
      gap="3"
      p="6"
      rounded="2xl"
      shadow="sm"
      w="full"
    >
      <p class="font-mono text-[11px] uppercase tracking-wider text-neutral-400">States & variants</p>
      <Box $class="demo-box-states" align="center" direction="row" display="flex" gap="4" wrap>
        <Box
          $class="demo-state-interactive"
          active:bg="sky-100"
          bg="neutral-100"
          border
          borderColor="neutral-300"
          cursor="pointer"
          focus:ring="4"
          hover:bg="sky-50"
          hover:shadow="md"
          p="4"
          rounded="xl"
          tabindex="0"
          transition="all"
        >
          <span class="text-sm font-medium text-neutral-700">Hover · focus · active</span>
        </Box>
        <Box
          $class="demo-state-disabled"
          bg="neutral-100"
          border
          borderColor="neutral-200"
          cursor="not-allowed"
          opacity="50"
          p="4"
          rounded="xl"
          select="none"
        >
          <span class="text-sm font-medium text-neutral-500">Disabled</span>
        </Box>
      </Box>
    </Box>

    <Box
      $class="demo-card-position"
      align="stretch"
      bg="white"
      border
      borderColor="neutral-200"
      direction="col"
      display="flex"
      gap="3"
      p="6"
      rounded="2xl"
      shadow="sm"
      w="full"
    >
      <p class="font-mono text-[11px] uppercase tracking-wider text-neutral-400">Positioning</p>
      <Box $class="demo-box-positioning" align="center" direction="row" display="flex" gap="4" wrap>
        <Box
          $class="demo-position-main"
          bg="violet-500"
          center
          display="flex"
          position="relative"
          rounded="2xl"
          size="24"
        >
          <span class="text-sm font-semibold text-white">Box</span>
          <Box
            $class="demo-position-label"
            bg="indigo-900"
            bottom="0"
            left="0"
            p="2"
            position="absolute"
            right="0"
            rounded="b-xl"
            z="10"
          >
            <span class="block text-center text-xs font-medium text-white">absolute · bottom</span>
          </Box>
        </Box>
        <Box $class="demo-position-overlay" position="relative" rounded="2xl" size="24">
          <Box
            $class="demo-position-overlay-inner"
            bg="indigo-900"
            center
            display="flex"
            inset="0"
            opacity="70"
            position="absolute"
            rounded="2xl"
          >
            <span class="text-sm font-medium text-white">inset · overlay</span>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
</template>
