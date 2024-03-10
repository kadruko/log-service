import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../../log/log';
import { LogStatus } from '../../log/log.status';

@Injectable()
export class LogDao {
  constructor(
    @InjectRepository(Log)
    private repository: Repository<Log>,
  ) {}

  async save(log: Log): Promise<Log> {
    return this.repository.save(log);
  }

  async setStatus(id: string, status: LogStatus): Promise<void> {
    await this.repository.update(id, { status });
  }
}
