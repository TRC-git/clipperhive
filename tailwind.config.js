/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      keyframes: {
        'honeycomb-shimmer': {
          '0%': { opacity: '0.1' },
          '50%': { opacity: '0.2' },
          '100%': { opacity: '0.1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'honeycomb-shimmer': 'honeycomb-shimmer 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards'
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        honey: {
          50: '#fff9eb',
          100: '#ffefc2',
          200: '#ffdf85',
          300: '#ffc83d',
          400: '#ffb81f',
          500: '#f7b733',
          600: '#e6920a',
          700: '#bf6d07',
          800: '#9c540d',
          900: '#7f450f',
        },
        charcoal: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d9d9dc',
          300: '#b8b9be',
          400: '#92949c',
          500: '#757782',
          600: '#5f616c',
          700: '#4d4f58',
          800: '#42444c',
          900: '#3b3c43',
        },
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
