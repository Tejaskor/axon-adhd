import type { Config } from "tailwindcss";

/**
 * Design tokens extracted from the live axonadhd.com Elementor CSS
 * (post-5067 home, post-12311 header, post-6632 footer). See PLAN.md §1.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "481px",
      sm: "768px",
      // Live site keeps multi-column grids at exactly 1024px.
      md: "1024px",
      lg: "1181px",
      xl: "1440px",
    },
    extend: {
      colors: {
        // Brand blue #2578CA and its scale. Light steps for backgrounds, glass and hover fills; dark steps for hover,
        // active and high-contrast text. `hover`/`deep`/`soft`/`tint` are named aliases kept for existing classes.
        primary: {
          DEFAULT: "#2578CA",
          hover: "#1E64AA",
          deep: "#19528C",
          soft: "#EEF5FC",
          tint: "#ECF3FA",
          100: "#DCEAF8",
          150: "#C9DEF4",
          200: "#B6D3F0",
          300: "#86B6E5",
          400: "#5498DB",
          500: "#2578CA",
          600: "#1E64AA",
          700: "#19528C",
          800: "#143F6D",
        },
        brand: { DEFAULT: "#2578CA", 2: "#5498DB" },
        navy: { DEFAULT: "#0B254B", 2: "#10294D", footer: "#061A36", mid: "#1D3C67" },
        ink: { DEFAULT: "#1A2748", 2: "#30353A", 3: "#1E242A", 4: "#27313F", menu: "#0F1B2E" },
        body: "#4B5563",
        muted: { DEFAULT: "#5B6B84", 2: "#70777D", 3: "#495056" },
        teal: { DEFAULT: "#0D7C66", soft: "#EEFBF7", dark: "#036868" },
        orange: { DEFAULT: "#EB8B01", soft: "#FFF7EB", star: "#FFB547" },
        surface: { DEFAULT: "#F2F6F9", 2: "#F8F9FB", 3: "#EEF0F2" },
        line: { DEFAULT: "#E5E7EB", 2: "#EEF0F2", 3: "#D1DEEA" },
        danger: "#D64545",
        announce: { from: "#068E5A", to: "#003621" },
      },
      fontFamily: {
        // One family site-wide (thinkitive.com type system). `display`/`geist`/`inter` are kept as aliases so existing
        // class names resolve to Manrope instead of needing a sweep.
        sans: ["var(--font-manrope)", "Manrope", "Arial", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "Arial", "sans-serif"],
        geist: ["var(--font-manrope)", "Manrope", "Arial", "sans-serif"],
        inter: ["var(--font-manrope)", "Manrope", "Arial", "sans-serif"],
      },
      maxWidth: { content: "1340px", prose: "820px" },
      borderRadius: { card: "14px", panel: "16px", xl2: "18px", pill: "50px" },
      boxShadow: {
        card: "0 0 10px 0 rgba(0,0,0,.04)",
        soft: "0 4px 15px rgba(0,0,0,.05)",
        cta: "0 8px 20px rgba(37,99,235,.32)",
        panel: "0 24px 60px rgba(15,27,46,.16), inset 0 1px 0 rgba(255,255,255,.85)",
        header: "0 8px 28px rgba(15,27,46,.06), inset 0 1px 0 rgba(255,255,255,.55)",
      },
      transitionTimingFunction: { brand: "cubic-bezier(.22,.61,.36,1)" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
};

export default config;
