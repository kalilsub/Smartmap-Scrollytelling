/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      screens: {
        xs: "480px",
        "max-xs": { max: "423px" },
      },
      width: {
        50: "49%",
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
}
