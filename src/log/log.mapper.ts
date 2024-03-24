import { Injectable } from '@nestjs/common';
import { Log } from './log';
import { LogDto } from './log.dto';
import { LogQueryDto } from './log.query.dto';

@Injectable()
export class LogMapper {
  toDto(log: Log, queryDto: LogQueryDto): LogDto {
    const dto = new LogDto();
    if (queryDto.isSelected('id')) {
      dto.id = log.id;
    }
    if (queryDto.isSelected('text')) {
      dto.text = log.text;
    }
    if (queryDto.isSelected('timestamp')) {
      dto.timestamp = log.timestamp;
    }
    if (queryDto.isSelected('status')) {
      dto.status = log.status;
    }
    if (queryDto.isSelected('createdAt')) {
      dto.createdAt = log.createdAt;
    }
    return dto;
  }
}
