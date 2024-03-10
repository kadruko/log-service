import { ApiPropertyOptional } from '@nestjs/swagger';

export class LogQueryDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  offset?: number;
}
