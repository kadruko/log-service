import { ApiPropertyOptional } from '@nestjs/swagger';

export class LogQueryDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  select: string = '*';

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  offset?: number;

  isSelected(field: string): boolean {
    const fields = this.select.replace(' ', '').split(',');
    return fields.includes(field) || fields.includes('*');
  }
}
