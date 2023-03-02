import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ApiProperty } from '@nestjs/swagger';
import { DbErrors } from './db_utils';
import { Result } from 'ts-results';
import { TodoError } from './todo/todo.service';

export type ServiceErrors = TodoError;

export function serviceCall<T>(result: Result<T, ServiceErrors>): T {
  if (result.err) {
    switch (result.val) {
      case DbErrors.NOT_FOUND:
        throw new NotFoundException();
      default:
        throw new InternalServerErrorException();
    }
  } else {
    return result.val;
  }
}

export class BadRequestDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
