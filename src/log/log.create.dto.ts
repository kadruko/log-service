import { ApiProperty } from '@nestjs/swagger';

export class LogCreateDto {
  @ApiProperty()
  timestamp: Date;
}
