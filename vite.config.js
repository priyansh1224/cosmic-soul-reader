import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@stores': '/src/stores',
      '@data': '/src/data',
      '@utils': '/src/utils',
      '@styles': '/src/styles',
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'gsap', 'framer-motion'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animation: ['gsap', 'framer-motion'],
          vendor: ['react', 'react-dom', 'zustand'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})