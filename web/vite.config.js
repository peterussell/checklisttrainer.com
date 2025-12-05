import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@features': path.resolve(__dirname, './src/features'),
            '@models': path.resolve(__dirname, './src/models'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@ct/core': path.resolve(__dirname, '../core/src'),
        }
    },
    plugins: [
        TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), // FIXME
        react(),
        tailwindcss()
    ],
});
