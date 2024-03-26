import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../../log/log';
import { LogQueryDto } from '../../log/log.query.dto';

@Injectable()
export class LogDao {
  constructor(
    @InjectRepository(Log)
    private repository: Repository<Log>,
  ) {}

  async getAll(queryDto: LogQueryDto): Promise<Log[]> {
    const query = this.repository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.voice', 'voice', 'log.voiceId = voice.id')
      .orderBy('log.timestamp', 'DESC')
      .skip(queryDto.offset)
      .take(queryDto.limit);

    if (queryDto.search) {
      query.where('log.text ILIKE :search', { search: `%${queryDto.search}%` });
    }
    if (queryDto.getStartTimestamp()) {
      query.andWhere('log.timestamp >= :startTimestamp', {
        startTimestamp: queryDto.getStartTimestamp(),
      });
    }
    if (queryDto.getEndTimestamp()) {
      query.andWhere('log.timestamp <= :endTimestamp', {
        endTimestamp: queryDto.getEndTimestamp(),
      });
    }

    return query.getMany();
  }

  async save(log: Log): Promise<Log> {
    return this.repository.save(log);
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
