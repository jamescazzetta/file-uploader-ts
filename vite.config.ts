import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        env: {
            NODE_ENV: 'test',
        },
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
    },
});
