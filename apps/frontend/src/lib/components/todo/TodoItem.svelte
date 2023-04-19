<script lang="ts">
  import { Icon, Trash } from 'svelte-hero-icons';
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { deleteTodo, putTodo, TODOS_KEY, type ClientTodo } from './api';

  export let todo: ClientTodo;

  let editing = false;

  const client = useQueryClient();

  const putTodoMutation = createMutation(putTodo, {
    onMutate: async (todo: ClientTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await client.cancelQueries([TODOS_KEY]);

      // Snapshot the previous value
      let previousTodos = client.getQueryData<ClientTodo[]>([TODOS_KEY]);

      // Optimistically update to the new value
      if (previousTodos !== undefined && previousTodos.length > 0) {
        // iterate previousTodos and update todo
        previousTodos = previousTodos.map((t) => {
          if (t.id === todo.id) {
            return todo;
          }
          return t;
        });
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

  const deleteTodoMutation = createMutation(deleteTodo, {
    onMutate: async (todo: ClientTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await client.cancelQueries([TODOS_KEY]);

      // Snapshot the previous value
      const previousTodos = client.getQueryData<ClientTodo[]>([TODOS_KEY]);

      // Optimistically update to the new value
      if (previousTodos) {
        // iterate previousTodos and update todo
        client.setQueryData<ClientTodo[]>(
          [TODOS_KEY],
          previousTodos.filter((t) => t.id !== todo.id)
        );
      }

      return { previousTodos };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err: any, variables: any, context: any) => {
      console.log('error');
      if (context?.previousTodos) {
        client.setQueryData<ClientTodo>([TODOS_KEY], context.previousTodos);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      client.invalidateQueries([TODOS_KEY]);
    },
  });
</script>

<div class=" flex flex-row justify-between">
  <div class="group flex flex-row items-center gap-2">
    <input
      type="checkbox"
      bind:checked={todo.completed}
      on:change={(e) => {
        $putTodoMutation.mutate(todo);
      }}
    />
    <input
      class="border-none"
      type="text"
      bind:value={todo.text}
      on:blur={() => {
        editing = false;
        $putTodoMutation.mutate(todo);
      }}
      on:keydown={(e) => {
        if (e.key === 'Enter') {
          editing = false;
          $putTodoMutation.mutate(todo);
        }
      }}
    />
    <button
      on:click={() => {
        $deleteTodoMutation.mutate(todo);
      }}
      class="text-background group-hover:text-primary hover:text-secondary h-full px-2"
    >
      <Icon src={Trash} mini size="20" />
    </button>
  </div>
</div>
