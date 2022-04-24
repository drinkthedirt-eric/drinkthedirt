module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    container: {
      center: true
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ]
};