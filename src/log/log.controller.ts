import { Controller, Get, Query } from '@nestjs/common';
import { LogQueryDto } from './log.query.dto';
import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly service: LogService) {}

  @Get()
  getAll(@Query() queryDto: LogQueryDto) {
    return this.service.getAll(queryDto);
  }
}
