/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "off-white": "#fefefe",
        grey: "#c5ccd5",
        "dark-grey": "#4d5366",
        "near-black": "#161616",
        "form-bg": "#e9edf2",
        "form-border": "#afb6c9",
        "form-tracker": "#6b6b6b",
        background: "#f3f6fa",
        brand: "#0b2265",
        "brand-dark": "#181b23",
        text: "#4d5366",
        "text-inverse": "#fff",
        "background-section": "#f3f6fa",
        blue: "#0e35ff",
        "button-default": "#0335ff",
        "button-highlight": "#032DD9",
        klein: "#0724B9",
        sunglow: "#ffd420",
        hawkes: "#e4eaf2",
        cerise: "#de3d5d",
        fiord: "#4d5266",
        "bay-of-many": "#313f64",
        solitude: "#d8dbe6",
        "echo-blue": "#abb4cc",
        accent: "#ffd420",
        "accent-high": "#000",
        highlight: "#d8dbe6",
        "highlight-high": "#f3f6fa",
        muted: "#fefefe",
        warning: "#ffd420",
        error: "#DB2E51",
        message: "#4d5266",
        success: "#8df8ad",
        teal: "teal",
        "link-colour": "#0059AF",
        "link-hover-colour": "#0D2259",
        "link-active-colour": "#000",
        "link-active-outline": "#ffd420",
        "link-focus-color": "#000",
        "link-focus-bg": "#ffd420",
        "dark-blue": "#071747",
        "status-dark-green": "#00851F",
        "status-green": "#B8FBC7",
        "status-grey": "#B1B5C2",
        "table-border": "#A5ADC6",
        "secondary-green": "#1d7c7",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
