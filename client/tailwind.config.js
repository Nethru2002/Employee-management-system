/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Slate 900 (Main Background)
        secondary: "#1E293B", // Slate 800 (Card Background)
        accent: "#3B82F6", // Blue 500 (Buttons/Highlights)
        textMain: "#F8FAFC", // Slate 50
        textMuted: "#94A3B8", // Slate 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}