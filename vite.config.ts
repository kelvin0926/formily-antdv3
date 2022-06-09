import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // '@ant-design-vue/pro-layout': fileURLToPath(new URL('./src', import.meta.url)),
      '@': path.resolve(__dirname, './src'),
      '@form-designer': path.resolve(__dirname, './src/formDesigner'),
    },
    extensions: ['.js', '.ts', '.vue', '.tsx', '.json']
  },
  // css相关配置
  css: {
    postcss: {},
    preprocessorOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,

      },
    },
  }
})
