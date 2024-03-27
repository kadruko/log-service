import { Module } from '@nestjs/common';
import { VoiceModule } from '../voice/voice.module';
import { LogController } from './log.controller';
import { LogMapper } from './log.mapper';
import { LogService } from './log.service';

@Module({
  imports: [VoiceModule],
  providers: [LogService, LogMapper],
  exports: [LogMapper],
  controllers: [LogController],
})
export class LogModule {}
