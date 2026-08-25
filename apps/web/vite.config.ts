import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'vue-router/vite'
import svgLoader from 'vite-svg-loader'
import { uiKitIcons } from '@dotdev/icons'
import { extendRoute } from '@dotdev/studio/vite'

const svgoConfig = {
  plugins: [{ name: 'preset-default' as const, params: { overrides: { removeViewBox: false as const } } }],
}

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@dotdev/ui-kit',
        replacement: fileURLToPath(new URL('../../packages/ui-kit/src/index.ts', import.meta.url)),
      },
    ],
  },
  server: {
    host: true,
  },
  plugins: [
    VueRouter({ routesFolder: ['./src/pages'], exclude: ['**/examples/**'], extendRoute }),
    vue(),
    tailwindcss(),
    svgLoader({ svgoConfig }),
    uiKitIcons({ outDir: './src/generated/icons' }),
  ],
})
