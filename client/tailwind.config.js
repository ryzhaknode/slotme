/** @type {import('tailwindcss').Config} */

export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		lineClamp: {
  			3: '3',
  		},
  		screens: {
  			xs: '475px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px',
  			'3xl': '1920px',
  			'mobile-sm': '320px',
  			'mobile-md': '375px',
  			'mobile-lg': '425px',
  			tablet: '768px',
  			'tablet-lg': '1024px',
  			desktop: '1280px',
  			'desktop-lg': '1440px',
  			'desktop-xl': '1920px'
  		},
  		colors: {
  			black: {
  				'50': '#f6f6f6',
  				'100': '#e7e7e7',
  				'200': '#d1d1d1',
  				'300': '#b0b0b0',
  				'400': '#888888',
  				'500': '#6d6d6d',
  				'600': '#5d5d5d',
  				'700': '#4f4f4f',
  				'800': '#454545',
  				'900': '#3d3d3d',
  				'950': '#000000',
  				DEFAULT: '#000000'
  			},
  			'dark-gray': {
  				'50': '#f6f6f6',
  				'100': '#e7e7e7',
  				'200': '#d1d1d1',
  				'300': '#b0b0b0',
  				'400': '#888888',
  				'500': '#6d6d6d',
  				'600': '#5d5d5d',
  				'700': '#4f4f4f',
  				'800': '#454545',
  				'900': '#3d3d3d',
  				'950': '#111111',
  				DEFAULT: '#111111'
  			},
  			'light-gray': {
  				'50': '#fafafa',
  				'100': '#f4f4f4',
  				'200': '#e9e9e9',
  				'300': '#d9d9d9',
  				'400': '#c4c4c4',
  				'500': '#E0E0E0',
  				'600': '#b3b3b3',
  				'700': '#a3a3a3',
  				'800': '#8a8a8a',
  				'900': '#6b6b6b',
  				'950': '#4a4a4a',
  				DEFAULT: '#E0E0E0'
  			},
  			orange: {
  				'50': '#fef7ed',
  				'100': '#fdedd3',
  				'200': '#fbd7a5',
  				'300': '#f8bc6d',
  				'400': '#f59e0b',
  				'500': '#E68801',
  				'600': '#d97706',
  				'700': '#b45309',
  				'800': '#92400e',
  				'900': '#78350f',
  				'950': '#451a03',
  				DEFAULT: '#E68801'
  			},
  			red: {
  				'50': '#fef2f2',
  				'100': '#fee2e2',
  				'200': '#fecaca',
  				'300': '#fca5a5',
  				'400': '#f87171',
  				'500': '#ED1B34',
  				'600': '#dc2626',
  				'700': '#b91c1c',
  				'800': '#991b1b',
  				'900': '#7f1d1d',
  				'950': '#450a0a',
  				DEFAULT: '#ED1B34'
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
  		},
  		fontFamily: {
  			sans: [
  				'Montserrat',
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Oxygen',
  				'Ubuntu',
  				'Cantarell',
  				'Fira Sans',
  				'Droid Sans',
  				'Helvetica Neue',
  				'sans-serif'
  			],
  			serif: [
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Fira Code',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			],
  			display: [
  				'Montserrat',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			montserrat: [
  				'Montserrat',
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Oxygen',
  				'Ubuntu',
  				'Cantarell',
  				'Fira Sans',
  				'Droid Sans',
  				'Helvetica Neue',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'10': [
  				'0.625rem',
  				{
  					lineHeight: '0.875rem'
  				}
  			],
  			'11': [
  				'0.6875rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			'12': [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			'13': [
  				'0.8125rem',
  				{
  					lineHeight: '1.125rem'
  				}
  			],
  			'14': [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			'15': [
  				'0.9375rem',
  				{
  					lineHeight: '1.375rem'
  				}
  			],
  			'16': [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			'18': [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'20': [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'22': [
  				'1.375rem',
  				{
  					lineHeight: '1.875rem'
  				}
  			],
  			'24': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'26': [
  				'1.625rem',
  				{
  					lineHeight: '2.125rem'
  				}
  			],
  			'28': [
  				'1.75rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'30': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'32': [
  				'2rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'36': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem',
  			'144': '36rem'
  		},
  		borderRadius: {
  			none: '0',
  			sm: 'calc(var(--radius) - 4px)',
  			DEFAULT: '0.25rem',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '0.75rem',
  			'2xl': '1rem',
  			'3xl': '1.5rem',
  			full: '9999px'
  		},
  		boxShadow: {
  			sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  			xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  			'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  			inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  			chat: '0 2px 8px rgba(0, 0, 0, 0.1)',
  			message: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'fade-out': 'fadeOut 0.5s ease-in-out',
  			'slide-in': 'slideIn 0.3s ease-out',
  			'slide-out': 'slideOut 0.3s ease-in',
  			'bounce-in': 'bounceIn 0.6s ease-out',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'spin-slow': 'spin 3s linear infinite',
  			'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			slideIn: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			slideOut: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			bounceIn: {
  				'0%': {
  					transform: 'scale(0.3)',
  					opacity: '0'
  				},
  				'50%': {
  					transform: 'scale(1.05)'
  				},
  				'70%': {
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			}
  		},
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100'
  		},
  		backdropBlur: {
  			xs: '2px'
  		}
  	}
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow: '0 15px 35px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.07)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-default': {
          '-ms-overflow-style': 'auto',
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        },
        '.chat-message': {
          '@apply bg-white rounded-lg shadow-message p-3 max-w-xs break-words': {},
        },
        '.chat-message-user': {
          '@apply bg-light-gray rounded-lg shadow-message p-3 max-w-xs break-words ml-auto': {},
        },
        '.input-focus': {
          '@apply focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent': {},
        },
        '.btn-primary': {
          '@apply bg-orange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200': {},
        },
        '.btn-secondary': {
          '@apply bg-light-gray hover:bg-light-gray-600 text-dark-gray font-semibold py-2 px-4 rounded-lg transition-colors duration-200': {},
        },
        '.btn-danger': {
          '@apply bg-red hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200': {},
        },
        '.text-primary': {
          '@apply text-orange': {},
        },
        '.text-secondary': {
          '@apply text-dark-gray': {},
        },
        '.text-muted': {
          '@apply text-light-gray-600': {},
        },
        '.bg-primary': {
          '@apply bg-orange': {},
        },
        '.bg-secondary': {
          '@apply bg-light-gray': {},
        },
      }
      addUtilities(newUtilities)
    },
      require("tailwindcss-animate")
],
};
