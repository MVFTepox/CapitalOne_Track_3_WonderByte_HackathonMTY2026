import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
        VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Capital One - WonderByte Hackathon 2026',
        short_name: 'Capital One',
        description: 'Aplicación de banca móvil para la gestión de transacciones y seguridad.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone  ',

        icons: [
          {
            src: '/public/LogoCapitalOne.webp',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/public/LogoCapitalOne.webp',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})