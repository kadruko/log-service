import { Module } from '@nestjs/common';
import { LogMapper } from './log.mapper';

@Module({
  providers: [LogMapper],
  exports: [LogMapper],
})
export class LogModule {}
