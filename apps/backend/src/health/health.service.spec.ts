import { HealthDto, HealthStatus } from 'src/health/health.dto';

import { HealthService } from 'src/health/health.service';

describe('HealthService', () => {
  describe('check', () => {
    it('should return status: ok', () => {
      expect(new HealthService().status()).toStrictEqual({
        statusCode: HealthStatus.OK,
      } as HealthDto);
    });
  });
});
