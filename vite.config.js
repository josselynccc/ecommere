import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vueLayouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vueLayouts({
      include: /\.json$/, // Esto asegura que los archivos JSON también se manejen
    })
  ],
  assetsInclude: ['**/*.glb', '**/*.pdf', '**/*.mp3', "**/*.mpeg"],
})
