import { ApiProperty } from '@nestjs/swagger';

export class VoiceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string | null;
}
