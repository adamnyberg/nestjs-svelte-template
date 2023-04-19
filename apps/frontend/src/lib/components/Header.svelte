<script lang="ts">
  import ThemeSwitcher from '$lib/themes/ThemeSwitcher.svelte';
</script>

<header class="mb-8 flex flex-row justify-between">
  <div class="flex flex-row gap-4">
    <a href="/">
      <h1>Home</h1>
    </a>
    <a href="/about">
      <h1>About</h1>
    </a>
  </div>

  <ThemeSwitcher />
</header>
