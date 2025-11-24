import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-naskh-arabic": ["var(--font-noto-naskh-arabic)"],
        "noto-kufi": ["var(--font-noto-kufi-arabic)"],
        primary: ["var(--kd-font-family-primary)"],
        secondary: ["var(--kd-font-family-secondary)"],
        code: ["var(--kd-font-family-code-view)"],
      },
      fontSize: {
        'hero-1': ['var(--kd-font-size-hero-1-sm)', { lineHeight: 'var(--kd-line-height-hero-1-sm)' }],
        'headline-1': ['var(--kd-font-size-headline-1-sm)', { lineHeight: 'var(--kd-line-height-headline-1-sm)' }],
        'body-1': ['var(--kd-font-size-body-1-sm)', { lineHeight: 'var(--kd-line-height-body-1-sm)' }],
        'body-2': ['var(--kd-font-size-body-2-sm)', { lineHeight: 'var(--kd-line-height-body-2-sm)' }],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'level-1': 'var(--kd-elevation-level-1)',
        'level-2': 'var(--kd-elevation-level-2)',
        'level-3': 'var(--kd-elevation-level-3)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            code: {
              color: 'inherit',
              backgroundColor: 'hsl(var(--muted))',
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
            ul: {
              marginLeft: '1.5rem',
              listStyleType: 'disc',
            },
            ol: {
              marginLeft: '1.5rem',
            },
            strong: {
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
