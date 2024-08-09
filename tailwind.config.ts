import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            colors: {
                main: '#35c16f',
                'main-300': '#42c87e',
                'main-200': '#66CF92',
                'main-100': '#EFFBEE',
                like: '#ff3672'
            },
            animation: {
                scaleIn: 'scaleIn 0.3s ease-out'
            },
            keyframes: {
                scaleIn: {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' }
                }
            },
            fontFamily: {
                Hyemin: ['Hyemin'],
                LaundryGothic: ['LaundryGothic'],
                Pretendard: ['Pretendard-Medium'],
                'Pretendard-100': ['Pretendard-Regular'],
                'Pretendard-200': ['Pretendard-SemiBold']
            }
        }
    },
    plugins: [require('@xpd/tailwind-3dtransforms')]
};
export default config;
