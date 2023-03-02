import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [LoggerModule.forRoot(), TodoModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
