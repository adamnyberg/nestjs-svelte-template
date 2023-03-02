import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { HealthDto } from 'src/health/health.dto';
import { HealthService } from 'src/health/health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly appService: HealthService) {}

  @Get()
  @ApiOkResponse({
    description: 'App health',
    type: HealthDto,
  })
  getStatus(): HealthDto {
    return this.appService.status();
  }
}
