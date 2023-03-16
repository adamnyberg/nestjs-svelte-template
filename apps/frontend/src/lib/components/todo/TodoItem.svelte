<script lang="ts">
  import type { TodoDto } from '$backend/prisma/generated/dtos';
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui';
  import { Icon, Pencil, Trash, Cog6Tooth } from 'svelte-hero-icons';

  export let todo: TodoDto;
</script>

<div class="flex flex-row justify-between">
  <div>{todo.text} {todo.completed}</div>
  <div>
    <Menu>
      <MenuButton>
        <Icon src={Cog6Tooth} size="22" solid />
      </MenuButton>

      <MenuItems>
        <MenuItem>
          <button class="flex w-full flex-row gap-1">
            <Icon src={Pencil} size="22" /> Edit
          </button>
        </MenuItem>
        <MenuItem disabled>
          <button class="flex w-full flex-row gap-1">
            <Icon src={Trash} size="22" /> Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</div>
