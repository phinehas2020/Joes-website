/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FAF9F6",
                accent: "#D4A373",
                'accent-light': "#E9D8A6",
                'accent-dark': "#B8956A",
                secondary: "#4A4A4A",
                'warm-white': "#FFFAF0",
                'deep-black': "#0A0A0A",
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '2rem',
                screens: {
                    '2xl': '1400px',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 8s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shimmer': 'shimmer 2.5s linear infinite',
                'slide-up': 'slideUp 0.8s ease-out',
                'slide-down': 'slideDown 0.8s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'magnetic': 'magnetic 0.3s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(212, 163, 115, 0.2), 0 0 10px rgba(212, 163, 115, 0.1)' },
                    '100%': { boxShadow: '0 0 20px rgba(212, 163, 115, 0.4), 0 0 30px rgba(212, 163, 115, 0.2)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                magnetic: {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(var(--tx), var(--ty))' },
                },
            },
            boxShadow: {
                'glow': '0 0 20px rgba(212, 163, 115, 0.3)',
                'glow-lg': '0 0 40px rgba(212, 163, 115, 0.4)',
                'inner-glow': 'inset 0 0 20px rgba(212, 163, 115, 0.1)',
                'luxury': '0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)',
                'luxury-lg': '0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            },
        },
    },
    plugins: [],
}
