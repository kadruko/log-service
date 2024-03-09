import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AudioService } from './audio.service';

@Controller('audios')
export class AudioController {
  constructor(private readonly service: AudioService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req: any, file, cb) => {
          const id = uuidv4();
          cb(null, `${id}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post()
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 1000 }), // 1gb
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    return this.service.create(file);
  }
}
