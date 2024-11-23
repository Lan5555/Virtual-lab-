import plugin from 'tailwindcss/plugin';
import { Config } from 'tailwindcss/types/config';

const config:Config = {
  corePlugins:{
    preflight:false
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,css}",
    './src/**/*.{js,jsx,ts,tsx,css}', // Ensure this includes all your files
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily:{
        juniper:['Juniper','sans-serif'],
      },
      fontSize:{
        xxs:'10px',
        xls:'5px',
        xxls:'8px'
      },
      height:{
        xs:'0.1px'
      }
    },
  },
  
  plugins: [
    
    plugin(function ({ addUtilities, theme, e }) {
      addUtilities({
        // Add your custom class for font-juniper
        '.font-juniper': {
          fontFamily: theme('fontFamily.juniper'),
        },
      });
    }),
    
  ],
  
};
export default config;
