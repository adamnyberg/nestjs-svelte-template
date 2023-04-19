<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import colorNames from './colorNames';
  import { mapColorNameToCssVarString, themes, type ThemeName } from './themes';
  import { themeStore, setTheme } from './themeStore';

  const setRootCssVars = (themeName: ThemeName) => {
    if (!document) return;
    const theme = themes[themeName];
    for (const colorName of colorNames) {
      const cssVar = mapColorNameToCssVarString(colorName);
      const color = theme.colors[colorName];
      document.documentElement.style.setProperty(cssVar, color);
    }
    document.documentElement.style.colorScheme = themeName;
    document.documentElement.style.setProperty('--theme-name', themeName);
  };

  onMount(() => {
    setRootCssVars(get(themeStore).name);
  });

  themeStore.subscribe((theme) => {
    setRootCssVars(theme.name);
  });
</script>

<div class="flex flex-row gap-2">
  <button on:click={() => setTheme('dark')}> Dark mode </button>
  <button on:click={() => setTheme('light')}> Light mode </button>
</div>
