/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'ui-sans-serif', 'system-ui'],
      },
    },
    colors: {
      primary: '#0A3A5E', // 짙은 파란색 (Navy Blue)
      secondary: '#6BBF47', // 밝은 녹색 (Light Green)
      neutral: '#F0F0EB', // 부드러운 베이지 또는 밝은 회색
      accent: '#A8D08D', // 밝은 녹색의 더 연한 톤
      darkGreen: '#004d40', // 짙은 녹색 (Dark Green)
      midGreen: '#388E3C', // 중간 톤의 녹색 (Mid Green)\
      white: '#ffffff',
      red: '#D2042D',
      confirm: '#27ae60',
      gray: {
        50: '#F9FAFB', // 매우 밝은 회색
        100: '#F3F4F6', // 밝은 회색
        200: '#E5E7EB', // 더 진한 밝은 회색
        300: '#D1D5DB', // 중간 밝기 회색
        400: '#9CA3AF', // 약간 진한 회색
        500: '#6B7280', // 중간 회색
        600: '#4B5563', // 진한 회색
        700: '#374151', // 더 진한 회색
        800: '#1F2937', // 매우 진한 회색
        900: '#111827', // 거의 검정에 가까운 회색
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
