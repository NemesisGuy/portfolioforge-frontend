import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // --- Add Server Configuration ---
  /*server: {
    port: 5173, // Specify your desired port here
    strictPort: true, // Optional: Make Vite fail if the port is already in use
    // host: true, // Optional: Use 'true' or '0.0.0.0' to expose on network
  }*/
})
