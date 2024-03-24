import { ApiPropertyOptional } from '@nestjs/swagger';

export class LogQueryDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  select: string = '*';

  @ApiPropertyOptional()
  limit: number = 100;

  @ApiPropertyOptional()
  offset: number = 0;

  @ApiPropertyOptional()
  timestamp?: string | string[];

  isSelected(field: string): boolean {
    const fields = this.select.replace(' ', '').split(',');
    return fields.includes(field) || fields.includes('*');
  }

  getStartTimestamp(): Date | undefined {
    let startTimestamp: string | undefined;
    if (Array.isArray(this.timestamp)) {
      startTimestamp = this.timestamp?.find((timestamp) =>
        timestamp.startsWith('>'),
      );
    } else if (this.timestamp?.startsWith('>')) {
      startTimestamp = this.timestamp;
    }
    return startTimestamp
      ? new Date(startTimestamp.replace('>', ''))
      : undefined;
  }

  getEndTimestamp(): Date | undefined {
    let endTimestamp: string | undefined;
    if (Array.isArray(this.timestamp)) {
      endTimestamp = this.timestamp?.find((timestamp) =>
        timestamp.startsWith('<'),
      );
    } else if (this.timestamp?.startsWith('<')) {
      endTimestamp = this.timestamp;
    }
    return endTimestamp ? new Date(endTimestamp.replace('<', '')) : undefined;
  }
}
