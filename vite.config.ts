import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { join } from 'path'

const root = join(__dirname, 'src', 'render')
// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: './',
  resolve: {
    alias: {
      "@/": root
    }
  },
  server: {
    open: false,
    port: parseInt(process.env.PORT) ?? 8080
  },
  plugins: [vue()]
})
