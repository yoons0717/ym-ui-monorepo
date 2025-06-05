/** @type {import('tailwindcss').Config} */
module.exports = {
  // v4에서는 content 대신 sources 사용 (더 직관적)
  sources: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/uikit/src/**/*.{js,ts,jsx,tsx}",
  ],

  // v4의 새로운 테마 시스템
  theme: {
    extend: {
      // CSS custom properties를 직접 사용 가능
      colors: {
        primary: {
          50: "oklch(0.95 0.01 250)",
          500: "oklch(0.5 0.2 250)",
          900: "oklch(0.3 0.15 250)",
        },
      },
    },
  },
};
