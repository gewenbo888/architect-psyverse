import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0E0F12",
        ink2: "#15161A",
        paper: "#E8E2D2",
        terracotta: "#C9926D",
        verdigris: "#82A09C",
        rust: "#A23B3B",
        gold: "#D4AF37",
        graphite: "#1B1D24",
        smoke: "#272A33",
        ash: "#6B6E7A",
        bone: "#A39E91",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slow-in": "slowIn 1.2s ease-out forwards",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slowIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
