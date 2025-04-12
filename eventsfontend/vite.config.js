import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        },
        dedupe: [
            'vue'
        ]
    },
    server: {
        // host:'localhost',
        // port:8080,
        proxy: {
            '/api': { //获取路径中包含了/api的请求
                target: 'http://localhost:8080',
                changeOrigin: true, //修改源
                // secure:true,
                rewrite: (path) => path.replace(/^\/api/, '') ///api替换为''
            }
        }   
    }
})