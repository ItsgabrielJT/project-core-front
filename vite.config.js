import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@images': path.resolve(__dirname,'./src/assets/statics/images'),
      '@constants': path.resolve(__dirname,'./src/assets/statics/constants'),
      '@styles': path.resolve(__dirname,'./src/assets/styles'),
      '@components': path.resolve(__dirname,'./src/components'),
      '@pages': path.resolve(__dirname,'./src/pages'),
      '@services': path.resolve(__dirname,'./src/services'),
      '@hook': path.resolve(__dirname,'./src/hooks'),
    },
  },
  plugins: [react()],
  test: {
    environment: "jsdom"
  }
})
