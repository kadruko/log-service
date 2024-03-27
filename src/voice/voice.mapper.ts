import { Voice } from './voice';
import { VoiceDto } from './voice.dto';

export class VoiceMapper {
  public toDto(voice: Voice): VoiceDto {
    const dto = new VoiceDto();
    dto.id = voice.id;
    dto.name = voice.name;
    return dto;
  }
}
