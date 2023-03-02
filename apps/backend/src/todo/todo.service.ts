import { DbErrors as DbError, catchDbErrors } from 'src/db_utils';
import { Injectable, Logger } from '@nestjs/common';
import { Ok, Result } from 'ts-results';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Todo } from 'prisma/generated/models';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Result<Todo[], TodoError>> {
    const { skip, take, cursor, where, orderBy } = params;
    return Ok(
      await this.prisma.todo.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    );
  }

  @catchDbErrors()
  async findOne(
    userWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<Result<Todo, TodoError>> {
    return Ok(
      await this.prisma.todo.findUniqueOrThrow({
        where: userWhereUniqueInput,
      }),
    );
  }

  @catchDbErrors()
  async create(data: Prisma.TodoCreateInput): Promise<Result<Todo, TodoError>> {
    return Ok(
      await this.prisma.todo.create({
        data,
      }),
    );
  }

  @catchDbErrors()
  async update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Result<Todo, TodoError>> {
    const { where, data } = params;
    return Ok(
      await this.prisma.todo.update({
        data,
        where,
      }),
    );
  }

  @catchDbErrors()
  async delete(
    where: Prisma.TodoWhereUniqueInput,
  ): Promise<Result<void, TodoError>> {
    await this.prisma.todo.delete({
      where,
    });
    return Ok(undefined);
  }
}

export type TodoError = DbError | Error;

enum Error {
  CONFLICT = 'Todo already exists',
}
