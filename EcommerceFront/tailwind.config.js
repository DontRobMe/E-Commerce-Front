/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1877f2',
        'custom-white': '#fff',
        'custom-black': '#000',
        'custom-blue-2': '#5865f2',
        'custom-blue-hover': '#3b49df',
        'custom-blue-hover-2': '#1e2b8f',
        'custom-white-hover': '#f0f2f5',
        'custom-black-hover': '#1c1e21',
      },
    },
  },
  plugins: [],
}
