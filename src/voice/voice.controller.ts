import { Body, Controller, Param, Patch } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceUpdateDto } from './voice.update.dto';

@Controller('voices')
export class VoiceController {
  constructor(private readonly service: VoiceService) {}

  @Patch(':id')
  async updateVoice(
    @Param('id') id: string,
    @Body() updateDto: VoiceUpdateDto,
  ) {
    return this.service.updateVoice(id, updateDto);
  }
}
