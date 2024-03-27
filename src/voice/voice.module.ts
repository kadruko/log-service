import { Module } from '@nestjs/common';
import { VoiceController } from './voice.controller';
import { VoiceMapper } from './voice.mapper';
import { VoiceService } from './voice.service';

@Module({
  providers: [VoiceService, VoiceMapper],
  controllers: [VoiceController],
  exports: [VoiceMapper],
})
export class VoiceModule {}
