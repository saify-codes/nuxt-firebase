/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "indigo",
          100: "{indigo.100}",
          200: "{indigo.200}",
          300: "{indigo.300}",
          400: "{indigo.400}",
          500: "indigo",
          600: "{indigo.600}",
          700: "{indigo.700}",
          800: "{indigo.800}",
          900: "{indigo.900}",
          950: "{indigo.950}",
        },
      },
    },
  },
  plugins: [],
};
