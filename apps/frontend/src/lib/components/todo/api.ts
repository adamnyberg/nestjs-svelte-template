import type { CreateTodoDto } from '$backend/src/todo/dto/create_todo.dto';
import type { TodoDto } from '$backend/prisma/generated/dtos';
import type { UpdateTodoDto } from '$backend/src/todo/dto/update_todo.dto';
import axios from 'axios';
import getEnvVariables from '../../utils/env';

const API_VERSION = 'v1';
const BASE_URL = `${getEnvVariables().API_URL}/${API_VERSION}`;
const TODO_RESOURCE_PATH = `${BASE_URL}/todos`;
export const TODOS_KEY = 'todos';

export type ClientTodo = Partial<TodoDto> & Pick<TodoDto, 'text' | 'completed'>;

export async function getTodos(): Promise<TodoDto[]> {
  try {
    const response = await axios.get(TODO_RESOURCE_PATH);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postTodo(todo: CreateTodoDto): Promise<TodoDto> {
  try {
    const response = await axios.post(TODO_RESOURCE_PATH, todo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteTodo(todo: ClientTodo): Promise<void> {
  if (!todo.id) {
    throw new Error('todo.id is required');
  }
  
  try {
    const response = await axios.delete(`${TODO_RESOURCE_PATH}/${todo.id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function putTodo(todo: ClientTodo): Promise<TodoDto> {
  if (!todo.id) {
    throw new Error('todo.id is required');
  }
  
  const body: UpdateTodoDto = {
    text: todo.text,
    completed: todo.completed,
  }
  try {
    const response = await axios.put(`${TODO_RESOURCE_PATH}/${todo.id}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
