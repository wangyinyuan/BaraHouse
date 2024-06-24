// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'www', // 项目根目录
  build: {
    outDir: 'dist', // 输出目录
    rollupOptions: {
      input: 'www/index.html', // 指定入口 HTML 文件
      output: {
        entryFileNames: 'src/main' // 输出的 JS 文件名
      }
    }
  },
  server: {
    open: true, // 自动打开浏览器
    watch: {
      usePolling: true // 使用轮询文件监视，适用于某些文件系统
    }
  }
})