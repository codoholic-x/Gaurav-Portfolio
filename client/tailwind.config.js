/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#0A0B14",
        surface: "#12142399",
        "surface-solid": "#131628",
        "glass-border": "rgba(255,255,255,0.08)",
        neon: {
          cyan: "#00F0FF",
          violet: "#9D4EDD",
          pink: "#FF3DAD",
          lime: "#B6FF3C",
        },
        ink: {
          DEFAULT: "#EDEFF7",
          muted: "#8A8FB3",
          dim: "#5C6088",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(at 20% 20%, rgba(157,78,221,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,240,255,0.18) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(255,61,173,0.18) 0px, transparent 50%)",
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0,240,255,0.35), 0 0 60px rgba(0,240,255,0.08)",
        "neon-violet": "0 0 20px rgba(157,78,221,0.35), 0 0 60px rgba(157,78,221,0.08)",
        "neon-pink": "0 0 20px rgba(255,61,173,0.35), 0 0 60px rgba(255,61,173,0.08)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      animation: {
        blob: "blob 16s infinite ease-in-out",
        "fade-up": "fadeUp 0.7s ease forwards",
        blink: "blink 1s step-end infinite",
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.95)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
