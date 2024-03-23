import { ApiPropertyOptional } from '@nestjs/swagger';

export class LogQueryDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  select?: string;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  offset?: number;

  constructor() {
    if (!this.select) {
      this.select = 'id,text,timestamp,status,createdAt';
    }
  }
}
