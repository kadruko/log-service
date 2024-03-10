import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogMapper } from './log.mapper';
import { LogService } from './log.service';

@Module({
  providers: [LogService, LogMapper],
  exports: [LogMapper],
  controllers: [LogController],
})
export class LogModule {}
