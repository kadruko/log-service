import { Injectable } from '@nestjs/common';
import { VoiceDao } from '../database/dao/voice.dao';
import { VoiceMapper } from './voice.mapper';
import { VoiceUpdateDto } from './voice.update.dto';

@Injectable()
export class VoiceService {
  constructor(
    private readonly dao: VoiceDao,
    private readonly mapper: VoiceMapper,
  ) {}

  async updateVoice(id: string, updateDto: VoiceUpdateDto) {
    let voice = await this.dao.get(id);

    if (updateDto.name !== undefined) {
      voice.name = updateDto.name;
    }

    voice = await this.dao.save(voice);
    const dto = this.mapper.toDto(voice);
    return dto;
  }
}
