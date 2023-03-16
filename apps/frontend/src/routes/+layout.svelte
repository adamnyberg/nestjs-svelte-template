<script lang="ts">
  import '../app.postcss';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
</script>

<svelte:head>
  <title>SvelteKit + TypeScript + TailwindCSS starter</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <Header />
  <slot />
</QueryClientProvider>
