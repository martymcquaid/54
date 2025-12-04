import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/chipify/projects/a22002d9-4d93-4aa3-a29a-ea22b595950e/preview',
  plugins: [react()],
  css: {
    // Ensure CSS is processed and injected correctly
    devSourcemap: true,
  },
  server: {
    port: 5232,
    host: true,
    strictPort: true,
    hmr: {
      // HMR will be proxied through our backend
      port: 5232,
    },
  },
})
