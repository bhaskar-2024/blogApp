import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://blogapp-6fcx.onrender.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
