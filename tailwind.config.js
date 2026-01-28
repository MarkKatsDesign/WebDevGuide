/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Dark theme base colors
				'dark': {
					900: '#0f172a', // Main background
					800: '#1e293b', // Card backgrounds
					700: '#334155', // Borders, secondary
					600: '#475569', // Muted text
				},
				// Accent colors for different concepts
				'accent': {
					blue: '#3b82f6',    // HTTP, requests
					green: '#22c55e',   // Success, responses
					orange: '#f97316',  // Warnings, important
					purple: '#a855f7',  // Security, encryption
					cyan: '#06b6d4',    // Data, information
					pink: '#ec4899',    // Errors, critical
					yellow: '#eab308',  // Highlights
				}
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
			},
			animation: {
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse 3s ease-in-out infinite',
				'slide-right': 'slideRight 1.5s ease-in-out infinite',
				'slide-left': 'slideLeft 1.5s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				slideRight: {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateX(100%)', opacity: '0' },
				},
				slideLeft: {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateX(-100%)', opacity: '0' },
				},
			}
		}
	},
	plugins: []
};
