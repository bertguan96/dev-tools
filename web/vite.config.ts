import { join } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
      '/network': {
        target: 'http://127.0.0.1:81/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/network/, ''),
      },
    },
    cors: true,
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),  // 配置项目别名
    }
  },
})
