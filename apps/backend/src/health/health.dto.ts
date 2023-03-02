import { ApiProperty } from '@nestjs/swagger';

export enum HealthStatus {
  OK = 'OK',
}

export class HealthDto {
  @ApiProperty({
    enum: HealthStatus,
    example: HealthStatus.OK,
  })
  statusCode: HealthStatus;
}
