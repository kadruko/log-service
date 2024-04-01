import { Injectable } from '@nestjs/common';
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
      // rmSync(file.path); - keep audio files for now
    }

    for (const transcriptionDto of transcriptionDtos) {
      if (
        transcriptionDto.content.text === '' || // no text
        transcriptionDto.end === transcriptionDto.start || // no length
        transcriptionDto.content.segments.length === 0 || // no segments
        Math.max(
          ...transcriptionDto.content.segments.map((s) => s.no_speech_prob),
        ) >= 0.7 // improbable
      ) {
        // no speech detected
        continue;
      }

      const timestamp = new Date(logCreateDto.timestamp);
      timestamp.setMilliseconds(
        timestamp.getMilliseconds() + transcriptionDto.start,
      );
      const voiceResult = await this.voiceDao.findClosest(
        transcriptionDto.embedding,
      );
      let voiceId: string;
      if (voiceResult?.cosineDistance <= 0.3) {
        // existing voice
        voiceId = voiceResult.voice.id;
      } else {
        // new voice
        let voice = new Voice();
        voice.embedding = transcriptionDto.embedding;
        voice = await this.voiceDao.save(voice);
        voiceId = voice.id;
      }

      const latestLog = await this.logDao.getLatestBefore(timestamp);
      if (
        latestLog && // previous log exists
        latestLog.voiceId === voiceId && // same voice
        latestLog.timestamp.getTime() >= timestamp.getTime() - 60 * 1000 // 1 minute difference allowed
      ) {
        // merge with previous log
        latestLog.text += ' ' + transcriptionDto.content.text;
        await this.logDao.save(latestLog);
      }

      // new log
      const log = new Log();
      log.timestamp = timestamp;
      log.text = transcriptionDto.content.text;
      log.voiceId = voiceId;
      await this.logDao.save(log);
    }
  }
}
