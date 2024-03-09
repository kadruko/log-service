import { Injectable } from '@nestjs/common';
import { TranscriptionApi } from './transcription.api';

@Injectable()
export class AudioService {
  constructor(private readonly transcriptionApi: TranscriptionApi) {}

  create(file: Express.Multer.File) {
    this.process(file);
  }

  async process(file: Express.Multer.File) {
    const transcriptionDto = await this.transcriptionApi.create(file);
  }
}
