import colorNames from './src/lib/themes/colorNames.js';
import pkg from 'tailwindcss/defaultTheme.js';
import tailwindForms from '@tailwindcss/forms';

const { fontFamily, screens } = pkg;

function mapColorNameToCssVarString(colorName) {
  return `--theme-${colorName}`;
}

const colors = colorNames.reduce(
  (curr, colorName) => ({
    ...curr,
    [colorName]: `var(${mapColorNameToCssVarString(colorName)})`,
  }),
  {}
);

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      xs: '475px',
      ...screens,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
    },
    colors,
  },
  plugins: [tailwindForms],
};

/** @type {import('tailwindcss').Config} */
export default config;
