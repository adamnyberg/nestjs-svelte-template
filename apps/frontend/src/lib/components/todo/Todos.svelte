<script lang="ts">
  import CreateTodo from './CreateTodo.svelte';
  import TodoItem from './TodoItem.svelte';

  import { getTodos, TODOS_KEY, type ClientTodo } from './api';
  import { createQuery } from '@tanstack/svelte-query';

  const todos = createQuery<ClientTodo[], Error>({
    queryKey: [TODOS_KEY],
    queryFn: () => getTodos(),
  });
</script>

<h2>Todos</h2>
<CreateTodo />
{#if $todos.data && $todos.data.length > 0}
  <ul class="flex flex-col gap-2">
    {#each $todos.data.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 1;
      return a.createdAt > b.createdAt ? 1 : -1;
    }) as todo}
      <li><TodoItem {todo} /></li>
    {/each}
  </ul>
{:else}
  <span>No todos</span>
{/if}
{#if $todos.status === 'loading'}
  <span>Loading...</span>
{:else if $todos.status === 'error'}
  <span>Error: {$todos.error.message}</span>
{/if}
{#if $todos.isFetching}
  <div style="color:darkgreen; font-weight:700">Background Updating...</div>
{/if}
