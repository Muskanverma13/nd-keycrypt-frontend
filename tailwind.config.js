/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'elliptic': 'elliptic 20s ease-in-out infinite',
      },
      keyframes: {
        elliptic: {
          '0%, 100%': { opacity: 100, scale: 1 },
          '50%': { opacity: 1, scale: 1.2 },
        }
      },
      zIndex: {
        '-10': '-10',
      }
    },
  },
  plugins: [],
};