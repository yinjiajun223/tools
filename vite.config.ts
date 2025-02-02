import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  base: '/', // 确保基础路径是根路径
  build: {
    outDir: 'dist' // 构建输出目录
  },
  plugins: [
    vue(),
    UnoCSS({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        // 这里可以添加自定义规则
      ],
      shortcuts: {
        // 这里可以添加自定义快捷方式
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @use "@/assets/styles/variables.scss" as *;
                `
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    open: true
  }
})
