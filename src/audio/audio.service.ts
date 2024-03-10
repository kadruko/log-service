import { Injectable } from '@nestjs/common';
import { LogDao } from '../database/dao/log.dao';
import { Log } from '../log/log';
import { LogCreateDto } from '../log/log.create.dto';
import { LogMapper } from '../log/log.mapper';
import { LogStatus } from '../log/log.status';
import { TranscriptionApi } from './transcription.api';
import { TranscriptionDto } from './transcription.dto';

@Injectable()
export class AudioService {
  constructor(
    private readonly logDao: LogDao,
    private readonly logMapper: LogMapper,
    private readonly transcriptionApi: TranscriptionApi,
  ) {}

  async create(file: Express.Multer.File, logCreateDto: LogCreateDto) {
    let log = new Log();
    log.timestamp = logCreateDto.timestamp;
    log.status = LogStatus.PENDING;
    log = await this.logDao.save(log);

    this.process(file, log);

    const dto = this.logMapper.toDto(log);
    return dto;
  }

  async process(file: Express.Multer.File, log: Log) {
    await this.logDao.setStatus(log.id, LogStatus.PROCESSING);

    let transcriptionDto: TranscriptionDto;
    try {
      transcriptionDto = await this.transcriptionApi.create(file);
    } catch (error) {
      await this.logDao.setStatus(log.id, LogStatus.FAILED);
      throw error;
    }

    log.text = transcriptionDto.text;
    log.status = LogStatus.COMPLETED;
    log = await this.logDao.save(log);
  }
}
