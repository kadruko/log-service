import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { TranscriptionApi } from './transcription.api';

@Module({
  imports: [HttpModule],
  providers: [AudioService, TranscriptionApi],
  controllers: [AudioController],
})
export class AudioModule {}
