import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// 标准 Vite 工程：默认 build 产出 dist/index.html + dist/assets/*（可部署到任意静态托管）
// npm run build:single 走 --mode single，把 JS/CSS 全内联成一个可双击打开的 HTML。
export default defineConfig(({ mode }) => {
  const single = mode === 'single'
  return {
    base: './',
    plugins: [vue(), ...(single ? [viteSingleFile()] : [])],
    server: { host: true, port: 5173 },
    preview: { host: true, port: 4173 },
    build: {
      outDir: single ? 'dist-single' : 'dist',
      emptyOutDir: true,
      cssCodeSplit: !single,
      assetsInlineLimit: single ? 100000000 : 4096,
      chunkSizeWarningLimit: 100000,
      reportCompressedSize: false
    }
  }
})
