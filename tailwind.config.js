/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg-color': '#F8F9FD'
      },
      spacing: {
        'screen-dash': 'calc(100vh - 64px)'
      },
      keyframes: {
        'scale-up': {
          '0%': {
            transform: 'scale(0.5)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      animation: {
        'scale-up': 'scale-up 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}

