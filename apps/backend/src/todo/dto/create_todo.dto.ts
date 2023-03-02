import { PickType } from '@nestjs/swagger';
import { TodoDto } from 'prisma/generated/dtos';

export class CreateTodoDto extends PickType(TodoDto, [
  'text',
  'completed',
] as const) {}
