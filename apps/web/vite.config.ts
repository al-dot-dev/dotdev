import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'vue-router/vite'
import svgLoader from 'vite-svg-loader'
import { uiKitIcons } from '@dotdev/icons'
import { extendRoute } from '@dotdev/studio/vite'
import { dotdevUiCss } from '@dotdev/ui-kit/plugin'

const svgoConfig = {
  plugins: [{ name: 'preset-default' as const, params: { overrides: { removeViewBox: false as const } } }],
}

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    dotdevUiCss(),
    VueRouter({ routesFolder: ['./src/pages'], exclude: ['**/examples/**'], extendRoute }),
    vue(),
    tailwindcss(),
    svgLoader({ svgoConfig }),
    uiKitIcons({ outDir: './src/generated/icons' }),
  ],
})
