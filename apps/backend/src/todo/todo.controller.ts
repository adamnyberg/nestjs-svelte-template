import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Logger,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create_todo.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { BadRequestDto, serviceCall } from 'src/controller_utils';
import { TodoDto } from 'prisma/generated/dtos';

@ApiTags('Todo')
@Controller('todos')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: TodoDto,
  })
  async findMany(): Promise<TodoDto[]> {
    return serviceCall(await this.todoService.findMany({}));
  }

  @Get(':id')
  @ApiOkResponse({
    type: TodoDto,
  })
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    return serviceCall(await this.todoService.findOne({ id }));
  }

  @Post()
  @ApiCreatedResponse({
    type: TodoDto,
  })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiBody({ type: CreateTodoDto })
  async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoDto> {
    return serviceCall(await this.todoService.create(createTodoDto));
  }

  @Put(':id')
  @ApiOkResponse({
    type: TodoDto,
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiBody({ type: UpdateTodoDto })
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDto> {
    return serviceCall(
      await this.todoService.update({
        where: { id },
        data: updateTodoDto,
      }),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    return serviceCall(await this.todoService.delete({ id }));
  }
}
