<script lang="ts">
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { postTodo, TODOS_KEY, type ClientTodo } from './api';

  const client = useQueryClient();

  function createTodo(text: string): ClientTodo {
    return { text, completed: false };
  }

  const addTodoMutation = createMutation(postTodo, {
    onMutate: async (todo: ClientTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await client.cancelQueries([TODOS_KEY]);

      // Snapshot the previous value
      const previousTodos = client.getQueryData<ClientTodo[]>([TODOS_KEY]);

      // Optimistically update to the new value
      if (previousTodos) {
        client.setQueryData<ClientTodo[]>(
          [TODOS_KEY],
          [...previousTodos, ...[todo]]
        );
      }

      return { previousTodos };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err: any, variables: any, context: any) => {
      if (context?.previousTodos) {
        client.setQueryData<ClientTodo>([TODOS_KEY], context.previousTodos);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      client.invalidateQueries([TODOS_KEY]);
    },
  });

  let text: string;
</script>

<form
  class="mb-4"
  on:submit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    $addTodoMutation.mutate(createTodo(text));
    text = '';
  }}
>
  <input type="text" bind:value={text} required />
  <button type="submit">Add Todo</button>
</form>
