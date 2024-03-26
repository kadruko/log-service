import { Injectable } from '@nestjs/common';
import { Voice } from '../voice/voice';
import { VoiceDto } from '../voice/voice.dto';
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
    if (queryDto.isSelected('createdAt')) {
      dto.createdAt = log.createdAt;
    }
    if (queryDto.isSelected('voice') && log.voice) {
      dto.voice = this.mapVoiceToDto(log.voice);
    }
    return dto;
  }

  private mapVoiceToDto(voice: Voice): VoiceDto {
    const dto = new VoiceDto();
    dto.id = voice.id;
    dto.name = voice.name;
    return dto;
  }
}
