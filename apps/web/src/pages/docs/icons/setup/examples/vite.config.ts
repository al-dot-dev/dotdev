import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import { uiKitIcons } from '@dotdev/icons'

export default defineConfig({
  plugins: [
    /* Keep viewBox so icons scale with font-size */
    svgLoader({
      svgoConfig: {
        plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
      },
    }),
    /* Generates the typed icon registry from ./pack (default dir) */
    uiKitIcons({ outDir: './src/generated/icons' }),
  ],
})
