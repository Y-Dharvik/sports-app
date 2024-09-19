import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), VitePWA({
    devOptions: {
      enabled: true // For making sure that the PWA is testable from the Local dev environment
    },
    registerType: 'autoUpdate',
    manifest: {
      name: "Sports Application",
      short_name: "Sports App",
      theme_color: '#AAF',
    },
  }), sentryVitePlugin({
    org: "dharvik",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})