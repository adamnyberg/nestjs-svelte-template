import type { Writable } from 'svelte/store';
import colorNames from './colorNames';
// import colorNames from '../../../themeColorNames.cjs';

export type ThemeName = 'light' | 'dark';

// export const colorNames = ['background', 'primary', 'secondary'] as const;

const wild_sand = '#F7F7F7';
const fiord = '#414B69';
const palette = {
  base: {
    '50': wild_sand,
    '100': '#E2E3E7',
    '200': '#CED1D8',
    '300': '#BBBEC8',
    '400': '#A5AAB8',
    '600': '#7E8499',
    '800': '#555F79',
    '900': fiord,
  },
  dodger_blue: {
    '300': '#80B2FE',
    '500': '#3A88FD',
    '700': '#0F63E0',
    '800': '#155CC5',
  },
  outrageous_orange: {
    '300': '#FEA081',
    '500': '#FD583A',
  },
};

export type ColorName = (typeof colorNames)[number];
export interface Theme {
  colors: {
    [key in ColorName]: string;
  };
  name: ThemeName;
}
export interface ThemeContextType {
  setTheme: (theme: ThemeName) => void;
  theme: Writable<Theme>;
}

export const themes: { [name in ThemeName]: Theme } = {
  light: {
    colors: {
      background: '#ffffff',
      primary: fiord,
      secondary: palette.base[600],
    },
    name: 'light',
  },
  dark: {
    colors: {
      background: '#ffffff',
      primary: fiord,
      secondary: palette.base[200],
    },
    name: 'dark',
  },
};

export function mapColorNameToCssVarString(colorName: ColorName) {
  return `--theme-${colorName}`;
}

export const colors = colorNames.reduce(
  (curr, colorName) => ({
    ...curr,
    [colorName]: `var(${mapColorNameToCssVarString(colorName)})`,
  }),
  {} as { [colorName in ColorName]: string }
);
