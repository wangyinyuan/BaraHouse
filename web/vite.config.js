import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: 'terser',
  },
  server: {
    open: true,
  }
})