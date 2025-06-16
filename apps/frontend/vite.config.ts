// https://vite.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@shared': path.resolve(__dirname, '../../packages/shared/dist'),
        },
    },
    preview: {
        host: true,
        port: 4173,
        allowedHosts: ['.railway.app'], // ✅ allow all Railway subdomains
    },
})