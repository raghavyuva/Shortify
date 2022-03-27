const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:
      {
        green:
          colors.emerald, yellow: colors.amber,
        purple: colors.violet,
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive']
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}