import type { Config } from 'tailwindcss'
import { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'brand': {
          50: '#e6f1ff',
          100: '#b3d7ff',
          200: '#80bdff',
          300: '#4da3ff',
          400: '#1a89ff',
          500: '#0070f3', // Primary brand color
          600: '#005bc2',
          700: '#004491',
          800: '#002e60',
          900: '#00192f'
        },
        'market': {
          'positive': '#10b981', // Green for gains
          'negative': '#ef4444', // Red for losses
          'neutral': '#6b7280' // Gray for neutral
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'market-card': '0 4px 6px -1px rgba(0, 112, 243, 0.1), 0 2px 4px -1px rgba(0, 112, 243, 0.06)',
        'leaderboard': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 1s ease-in-out infinite'
      },
      borderRadius: {
        'market': '0.625rem' // 10px
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#0070f3',
              '&:hover': {
                color: '#005bc2'
              }
            }
          }
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.market-gradient': {
          background: 'linear-gradient(135deg, #0070f3 0%, #00c6ff 100%)',
        },
        '.market-shadow': {
          boxShadow: '0 10px 15px -3px rgba(0, 112, 243, 0.2), 0 4px 6px -2px rgba(0, 112, 243, 0.1)',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config
