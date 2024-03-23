import { Injectable } from '@nestjs/common';
import { LogDao } from '../database/dao/log.dao';
import { LogMapper } from './log.mapper';
import { LogQueryDto } from './log.query.dto';

@Injectable()
export class LogService {
  constructor(
    private readonly dao: LogDao,
    private readonly mapper: LogMapper,
  ) {}

  async getAll(queryDto: LogQueryDto) {
    const logs = await this.dao.getAll(queryDto);
    return logs.map((log) => this.mapper.toDto(log, queryDto));
  }

  async deleteAll() {
    return this.dao.deleteAll();
  }
}
