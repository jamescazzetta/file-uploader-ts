import { type Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                anthracite: '#cbcbc5',
            },
        },
    },
    plugins: [],
} satisfies Config;
