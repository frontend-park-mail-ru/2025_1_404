import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
    plugins: [
        legacy()
    ],
    server: {
        port: 8000
    },
    preview: {
        port: 8000
    },
    build: {
        outDir: 'deploy/public',
    }
})