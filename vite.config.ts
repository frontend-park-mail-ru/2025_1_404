import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import compression from 'vite-plugin-compression'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
    plugins: [
        legacy(),

        compression({ algorithm: 'gzip' }),
        compression({ algorithm: 'brotliCompress', ext: '.br' }),

        imagetools()
    ],
    server: {
        port: 8000
    },
    preview: {
        port: 8000
    },
    build: {
        target: "esnext",
        outDir: 'deploy/public',
    },
    esbuild: {
        target: "esnext",
        supported: {
            'top-level-await': true
        },
    }
})