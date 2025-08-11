import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 5124,
    strictPort: true
  }
})
