import { Injectable } from '@nestjs/common';
import { VoiceMapper } from '../voice/voice.mapper';
import { Log } from './log';
import { LogDto } from './log.dto';
import { LogQueryDto } from './log.query.dto';

@Injectable()
export class LogMapper {
  constructor(private readonly voiceMapper: VoiceMapper) {}

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
    if (queryDto.isSelected('createdAt')) {
      dto.createdAt = log.createdAt;
    }
    if (queryDto.isSelected('voice') && log.voice) {
      dto.voice = this.voiceMapper.toDto(log.voice);
    }
    return dto;
  }
}
