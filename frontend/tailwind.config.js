/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: '#121212', // From --bg-primary
                foreground: '#f8f8f8', // From --text-primary
                secondary: '#1e1e1e', // From --bg-secondary
                tertiary: '#2d2d2d', // From --bg-tertiary
                muted: {
                    DEFAULT: '#a0a0a0', // From --text-secondary
                    foreground: '#6c757d'
                },
                accent: {
                    DEFAULT: '#8a2be2', // From --accent-primary
                    secondary: '#9f5fff', // From --accent-secondary
                    highlight: '#b388ff', // From --accent-highlight
                    subtle: '#4d3b72' // From --accent-subtle
                },
                destructive: {
                    DEFAULT: '#dc3545',
                    foreground: '#ffffff'
                },
                border: '#dee2e6',
                input: '#e9ecef',
                ring: '#80bdff',
                chart: {
                    '1': '#ff6384',
                    '2': '#36a2eb',
                    '3': '#cc65fe',
                    '4': '#ffce56',
                    '5': '#4bc0c0'
                }
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};