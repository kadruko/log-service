import { Injectable } from '@nestjs/common';
import { Log } from './log';
import { LogDto } from './log.dto';

@Injectable()
export class LogMapper {
  toDto(log: Log): LogDto {
    const dto = new LogDto();
    dto.id = log.id;
    dto.text = log.text;
    dto.timestamp = log.timestamp;
    dto.status = log.status;
    dto.createdAt = log.createdAt;
    return dto;
  }
}
