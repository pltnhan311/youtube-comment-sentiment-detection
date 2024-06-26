import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'main-gray': '#f5f5f5',
        'main-darkgray': '#262626',
        'main-green': '#a0d911',
        'main-volcano': '#fa541c',
        'main-cyan': '#08979c',
        'main-yellow': '#fadb14'
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        'times-new-roman': ['Times New Roman', 'serif']
      },
      keyframes: {
        'animated-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      backgroundSize: {
        '400%': '400%'
      },
      animation: {
        gradient: 'animated-gradient 20s ease infinite alternate'
      }
    }
  },
  plugins: []
}
export default config;
