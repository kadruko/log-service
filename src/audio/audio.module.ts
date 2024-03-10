import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { TranscriptionApi } from './transcription.api';

@Module({
  imports: [HttpModule, LogModule],
  providers: [AudioService, TranscriptionApi],
  controllers: [AudioController],
})
export class AudioModule {}
