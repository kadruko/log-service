import { ApiPropertyOptional } from '@nestjs/swagger';

export class LogQueryDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  select?: string = 'id,text,timestamp,status,createdAt';

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  offset?: number;
}
