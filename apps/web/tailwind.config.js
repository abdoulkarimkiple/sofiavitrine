/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sofia: {
          black: "#050505",
          charcoal: "#0d0d0d",
          surface: "#151515",
          light: "#1d1d1d",
          gold: "#d4a72c",
          "gold-light": "#f2ca57",
          "gold-dark": "#9d6f0c",
          cream: "#f5ead5",
          muted: "#b9b2a8",
          brown: "#4a2b16",
          copper: "#b85c23"
        }
      },
      fontFamily: {
        display: ["Cinzel", "Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "Manrope", "system-ui", "sans-serif"]
      },
      boxShadow: {
        gold: "0 18px 60px rgba(212, 167, 44, 0.14)",
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, rgba(242,202,87,.75), transparent)"
      }
    },
  },
  plugins: [],
};
