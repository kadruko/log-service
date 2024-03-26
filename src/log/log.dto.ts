import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VoiceDto } from '../voice/voice.dto';

export class LogDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  text?: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  voice: VoiceDto;
}
