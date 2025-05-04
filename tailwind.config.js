/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          purple1: '#0f0529',
          purple2: '#4a2574',
          purple3: '#7338a0',
          purple4: '#924dbf',
          purple5: '#9b72c3',
        }
      }
    },
  },
  plugins: [],
}