import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env
    },
    build: {
        rollupOptions: {
            external: ['fs']
        }
    },
    resolve: {
        alias: {
            '@realestatemanager/utilities': path.resolve(__dirname, 'restricted-modules.ts'),
            // '@another/restricted-module': path.resolve(__dirname, 'restricted-modules.ts'),
        },
    },
});