module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Keep your existing colors
        accent: '#FF4081',
        'dark-800': '#1F2937',
        'dark-700': '#374151',
        'dark-600': '#4B5563',
        // Add these specific colors for Clerk
        gray: {
          100: '#F3F4F6',
          300: '#D1D5DB',
          400: '#9CA3AF'
        }
      }
    }
  },
  plugins: [],
};