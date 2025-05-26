import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import compression from 'vite-plugin-compression'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';

export default defineConfig({
    plugins: [
        legacy(),

        compression({ algorithm: 'gzip' }),
        compression({ algorithm: 'brotliCompress', ext: '.br' }),
        ViteImageOptimizer()
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
    },
    css: {
        postcss: './postcss.config.cjs'
    }
})