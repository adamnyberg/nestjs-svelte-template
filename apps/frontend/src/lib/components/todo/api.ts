import type { CreateTodoDto } from '$backend/src/todo/dto/create_todo.dto';
import type { TodoDto } from '$backend/prisma/generated/dtos';
// import type { UpdateTodoDto } from '@backend/src/todo/dto/update_todo.dto';
import axios from 'axios';

const BASE_URL = "https://nestjs-svelte-template-production.up.railway.app/v1"

export async function getTodos(): Promise<TodoDto[]> {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postTodo(todo: CreateTodoDto): Promise<TodoDto> {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteTodo(id: string): Promise<void> {
  await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });
}

export async function putTodo(todo: TodoDto): Promise<TodoDto> {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return response.json();
}
