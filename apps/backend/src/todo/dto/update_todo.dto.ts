import { CreateTodoDto } from './create_todo.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
