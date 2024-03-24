import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LogDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  text?: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  createdAt: Date;
}
