import { ApiProperty } from '@nestjs/swagger';

export class VoiceUpdateDto {
  @ApiProperty()
  name?: string | null;
}
