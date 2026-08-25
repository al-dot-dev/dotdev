# @dotdev/ui-kit

Themeable [Vue 3](https://vuejs.org) UI component library with first-class TypeScript support.

## Install

```sh
npm install @dotdev/ui-kit
```

Requires `vue` and `vue-router` as peer dependencies.

## Usage

Register the plugin once — it sets up theming and provides the configuration to all components:

```ts
import { createUiKit } from '@dotdev/ui-kit'
import App from './App.vue'

createApp(App).use(createUiKit({ namespace: 'd' })).mount('#app')
```

Then use components directly:

```vue
<script setup lang="ts">
import { Button } from '@dotdev/ui-kit'
</script>

<template>
  <Button ui="button" color="primary" variant="solid" label="Click me" />
</template>
```

## License

[MIT](./LICENSE)
