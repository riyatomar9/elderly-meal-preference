export default
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': {
            transform: 'translate(-50%, -100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translate(-50%, 0)',
            opacity: '1'
          }
        },
        'bounce': {
          '0%, 100%': { transform: 'translate(-50%, 0)' },
          '50%': { transform: 'translate(-50%, -25%)' }
        }
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'bounce': 'bounce 1s infinite'
      }
    },
  },
  plugins: [],
}
