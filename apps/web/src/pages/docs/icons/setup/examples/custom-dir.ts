import { defineConfig } from 'vite'
import { uiKitIcons } from '@dotdev/icons'

/* Point the plugin at your own folder of SVGs instead of the default pack/ */
export default defineConfig({
  plugins: [
    uiKitIcons({
      dir: './src/assets/icons',
      outDir: './src/generated/icons',
    }),
  ],
})
