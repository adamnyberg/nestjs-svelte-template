import { HealthDto, HealthStatus } from 'src/health/health.dto';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';
import { HealthService } from 'src/health/health.service';

describe('AppController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = app.get<HealthController>(HealthController);
  });

  describe('health', () => {
    it('should return status: OK', () => {
      const statusResponse: HealthDto = { statusCode: HealthStatus.OK };
      expect(controller.getStatus()).toStrictEqual(statusResponse);
    });
  });
});
