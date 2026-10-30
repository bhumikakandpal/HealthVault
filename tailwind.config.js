/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#dce8f4',
          200: '#b6cfe9',
          300: '#84acd6',
          400: '#5183bf',
          500: '#3263a3',
          600: '#274d85',
          700: '#1f3d6a',
          800: '#16263f',
          900: '#0d1828',
          950: '#070f1a',
        },
        teal: {
          50: '#effcf9',
          100: '#c8f7ee',
          200: '#92eddd',
          300: '#56dbca',
          400: '#26c3b3',
          500: '#0fa89a',
          600: '#0a8579',
          700: '#0c6a62',
          800: '#0e5450',
          900: '#114643',
          950: '#032826',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(13, 24, 40, 0.06), 0 1px 2px 0 rgba(13, 24, 40, 0.04)',
        'card-hover': '0 10px 30px -5px rgba(13, 24, 40, 0.12), 0 4px 12px -3px rgba(13, 24, 40, 0.08)',
        glow: '0 0 0 3px rgba(15, 168, 154, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
