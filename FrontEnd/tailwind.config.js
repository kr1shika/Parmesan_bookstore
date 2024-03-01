/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderColor: ['focus'],

    extend: {
      fontFamily:{
        jomhu:['Jomhuria', 'serif'],
        salsa:[ 'Salsa', 'cursive']
      } 
    },
  },
  plugins: [],
}

