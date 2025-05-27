/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4361EE',
          700: '#2541C4',
          800: '#1e3a8a',
          900: '#172554',
          950: '#0b1229',
        },
        secondary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#4CC9F0',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        accent: {
          50: '#fbf6fe',
          100: '#f5ebfd',
          200: '#ead6fb',
          300: '#d9b3f7',
          400: '#c285f0',
          500: '#a649D9',
          600: '#7209B7',
          700: '#6b21a8',
          800: '#581c87',
          900: '#3b0764',
          950: '#270545',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.800'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            h1: {
              color: theme('colors.neutral.900'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.neutral.900'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.neutral.900'),
              fontWeight: '600',
            },
            h4: {
              color: theme('colors.neutral.900'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.accent.700'),
              backgroundColor: theme('colors.accent.50'),
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: theme('colors.neutral.800'),
              color: theme('colors.neutral.50'),
              fontSize: '0.875rem',
              lineHeight: '1.5',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};