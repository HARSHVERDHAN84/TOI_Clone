/** @type {import('tailwindcss').Config} */
export default {
  content: ["*"],
  theme: {
    extend: {
      colors: {
       'primary-color':'#1a1a1a',
       'red-color-text': '#e21b22',
       'link-hover-color': '#595959',
        
      },

      backgroundColor: {
        'bg-nav-bar-color':'#f6f6f6',
        'bg-pink-color': '#fff5f6',
      },
      animation: {
        'zoom': ' 0.9s ease',
      },
    },
  },
  plugins: [],
}

