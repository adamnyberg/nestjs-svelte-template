<script lang="ts">
  import CreateTodo from './CreateTodo.svelte';
  import TodoItem from './TodoItem.svelte';

  import { getTodos } from './api';
  import { createQuery } from '@tanstack/svelte-query';
  import type { TodoDto } from '$backend/prisma/generated/dtos';

  const todos = createQuery<TodoDto[], Error>({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  });

  // let todos: string[] = ['Learn Svelte', 'Learn Vite', 'Learn SvelteKit'];

  function useQuery(arg0: string, getTodos: () => Promise<TodoDto[]>) {
    throw new Error('Function not implemented.');
  }
</script>

<h2>Todos</h2>
<CreateTodo />
{#if $todos.status === 'loading'}
  <span>Loading...</span>
{:else if $todos.status === 'error'}
  <span>Error: {$todos.error.message}</span>
{:else}
  <ul>
    {#each $todos.data as todo}
      <li><TodoItem {todo} /></li>
    {/each}
  </ul>
  {#if $todos.isFetching}
    <div style="color:darkgreen; font-weight:700">Background Updating...</div>
  {/if}
{/if}
<!-- <ul>
  {#each todos as todo}
    <li><TodoItem {todo} /></li>
  {/each}
</ul> -->
