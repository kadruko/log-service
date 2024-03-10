import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LogStatus } from './log.status';

export class LogDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  text?: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  status: LogStatus;

  @ApiProperty()
  createdAt: Date;
}
