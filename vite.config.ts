import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

let siteConfiguration: Record<string, unknown> = {}

try {
  siteConfiguration = (await import('./.figma/make/site.json', { assert: { type: 'json' } })).default
} catch {
  siteConfiguration = {}
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/LinkBiz/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
