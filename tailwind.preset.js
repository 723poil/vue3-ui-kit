/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // 메인 브랜드 컬러 (모던 블랙/그레이)
        primary: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#252525",
          900: "#171717",
          950: "#0a0a0a",
          DEFAULT: "#252525",
        },
        // 보조 컬러 (비비드 핑크)
        secondary: {
          50: "#fff0f3",
          100: "#ffe0e6",
          200: "#ffc2cf",
          300: "#ff94ab",
          400: "#ff577d",
          500: "#ff0b55",
          600: "#db0044",
          700: "#b30034",
          800: "#8c002a",
          900: "#6b0022",
          950: "#450013",
          DEFAULT: "#FF0B55",
          foreground: "#ffffff",
        },
        // 상태 표시 컬러 (눈이 편안한 톤 다운된 색상)
        success: "#10b981", // Emerald 500
        warning: "#f59e0b", // Amber 500
        danger: "#ef4444", // Red 500
        info: "#3b82f6", // Blue 500

        // 배경 및 표면 색상
        background: "#F4F4F4", // 앱 전체 배경
        surface: "#ffffff", // 카드, 패널 배경

        // 텍스트 색상
        text: {
          main: "#252525", // Primary Default
          muted: "#737373", // Primary 500
        },

        // 테두리 색상
        border: "#e5e5e5", // Primary 200
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Roboto 우선
      },
    },
  },
  plugins: [],
};
