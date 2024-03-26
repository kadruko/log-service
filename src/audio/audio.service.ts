import { Injectable } from '@nestjs/common';
import { rmSync } from 'fs';
import { LogDao } from '../database/dao/log.dao';
import { VoiceDao } from '../database/dao/voice.dao';
import { Log } from '../log/log';
import { LogCreateDto } from '../log/log.create.dto';
import { Voice } from '../voice/voice';
import { TranscriptionApi } from './transcription.api';
import { TranscriptionDto } from './transcription.dto';

@Injectable()
export class AudioService {
  constructor(
    private readonly logDao: LogDao,
    private readonly transcriptionApi: TranscriptionApi,
    private readonly voiceDao: VoiceDao,
  ) {}

  async create(file: Express.Multer.File, logCreateDto: LogCreateDto) {
    this.process(file, logCreateDto);
  }

  async process(file: Express.Multer.File, logCreateDto: LogCreateDto) {
    let transcriptionDtos: TranscriptionDto[];
    try {
      transcriptionDtos = await this.transcriptionApi.create(file);
    } catch (error) {
      throw error;
    } finally {
      rmSync(file.path);
    }

    for (const transcriptionDto of transcriptionDtos) {
      const log = new Log();
      const timestamp = new Date(logCreateDto.timestamp);
      timestamp.setMilliseconds(
        timestamp.getMilliseconds() + transcriptionDto.start,
      );
      log.timestamp = timestamp;
      log.text = transcriptionDto.content.text;

      const voiceResult = await this.voiceDao.findClosest(
        transcriptionDto.embedding,
      );
      if (voiceResult?.cosineDistance <= 0.3) {
        log.voiceId = voiceResult.voice.id;
      } else {
        let voice = new Voice();
        voice.embedding = transcriptionDto.embedding;
        voice = await this.voiceDao.save(voice);
        log.voiceId = voice.id;
      }

      await this.logDao.save(log);
    }
  }
}
