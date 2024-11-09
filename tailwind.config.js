/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Tailwind Blue
        secondary: "#64748B", // Tailwind Slate
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
