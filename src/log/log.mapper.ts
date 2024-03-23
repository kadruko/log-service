import { Injectable } from '@nestjs/common';
import { Log } from './log';
import { LogDto } from './log.dto';
import { LogQueryDto } from './log.query.dto';

@Injectable()
export class LogMapper {
  toDto(log: Log, queryDto: LogQueryDto): LogDto {
    const dto = new LogDto();
    if (queryDto.select.replace(' ', '').split(',').includes('id')) {
      dto.id = log.id;
    }
    if (queryDto.select.replace(' ', '').split(',').includes('text')) {
      dto.text = log.text;
    }
    if (queryDto.select.replace(' ', '').split(',').includes('timestamp')) {
      dto.timestamp = log.timestamp;
    }
    if (queryDto.select.replace(' ', '').split(',').includes('status')) {
      dto.status = log.status;
    }
    if (queryDto.select.replace(' ', '').split(',').includes('createdAt')) {
      dto.createdAt = log.createdAt;
    }
    return dto;
  }
}
