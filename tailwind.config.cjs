/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0 0 1px rgba(0,0,0,0.24), 0 0 2px rgba(0,0,0,0.16), 0 3px 4px rgba(0,0,0,0.06), 0 6px 8px rgba(0,0,0,0.06), 0 12px 16px rgba(0,0,0,0.08), 0 18px 32px rgba(0,0,0,0.06)",
        input:
          "0 0 1px rgba(0,0,0,0.32), 0 0 2px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
