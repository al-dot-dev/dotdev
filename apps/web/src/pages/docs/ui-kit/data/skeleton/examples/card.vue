<script lang="ts" setup>
import { Avatar, Button, Skeleton, SkeletonProvider } from '@dotdev/ui-kit'
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <div>
    <div class="flex gap-4 mb-4">
      <Button label="Toggle loading" @click="loading = !loading" />

      <Skeleton :loading="loading" class="w-10" rounded square>
        <Avatar alt="User avatar" src="https://i.pravatar.cc/100?img=8" />
      </Skeleton>
    </div>

    <SkeletonProvider is="div" :loading="loading" class="flex w-sm flex-col gap-4 rounded-xl border border-default p-4">
      <div class="flex items-center gap-3">
        <Skeleton class="w-10" rounded square>
          <Avatar alt="User avatar" src="https://i.pravatar.cc/100?img=8" />
        </Skeleton>

        <Skeleton is="div" :lines="2" class="text-sm" skeleton-class="w-1/2 text-sm" text>
          <p>Alex Pavlov</p>
          <p class="text-muted">alex.pavlov@dotdev.com</p>
        </Skeleton>
      </div>

      <Skeleton is="p" :lines="3" text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis eos natus quam vitae. Quidem...
      </Skeleton>

      <Skeleton is="div" class="flex justify-end gap-2" skeleton-class="ml-auto h-sm radius-md w-24">
        <Button label="View post" size="sm" variant="outlined" />
      </Skeleton>
    </SkeletonProvider>
  </div>
</template>
