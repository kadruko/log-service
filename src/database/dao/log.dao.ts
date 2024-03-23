import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../../log/log';
import { LogQueryDto } from '../../log/log.query.dto';
import { LogStatus } from '../../log/log.status';

@Injectable()
export class LogDao {
  constructor(
    @InjectRepository(Log)
    private repository: Repository<Log>,
  ) {}

  async getAll(queryDto: LogQueryDto): Promise<Log[]> {
    const query = this.repository
      .createQueryBuilder('log')
      .orderBy('timestamp', 'DESC')
      .skip(queryDto.limit || 0)
      .take(queryDto.offset || 100);

    if (queryDto.search) {
      query.where('text ILIKE :search', { search: `%${queryDto.search}%` });
    }

    return query.getMany();
  }

  async save(log: Log): Promise<Log> {
    return this.repository.save(log);
  }

  async setStatus(id: string, status: LogStatus): Promise<void> {
    await this.repository.update(id, { status });
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
