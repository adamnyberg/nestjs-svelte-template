import { HealthDto, HealthStatus } from './health.dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  status(): HealthDto {
    this.logger.log('Health check');
    return { statusCode: HealthStatus.OK };
  }
}
