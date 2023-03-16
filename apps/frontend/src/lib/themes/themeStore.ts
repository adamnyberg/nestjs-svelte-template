import { themes, type ThemeName } from './themes';
import { writable } from 'svelte/store';

let currentTheme: ThemeName = 'light';

// set up Theme store, holding current theme object
export const themeStore = writable(themes[currentTheme]);

export const setTheme = (theme: ThemeName) => {
  currentTheme = theme;
  themeStore.set(themes[theme]);
}
