import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import { readFileSync } from 'fs';
import { basename } from 'path';
import { firstValueFrom } from 'rxjs';
import { TranscriptionDto } from './transcription.dto';

@Injectable()
export class TranscriptionApi {
  private static readonly BASE_URL = 'http://89.58.29.139:5011';

  constructor(private readonly httpService: HttpService) {}

  async create(file: Express.Multer.File) {
    const formData = new FormData();
    const fileName = basename(file.path);
    const buffer = readFileSync(file.path);
    formData.append('audio', buffer, fileName);
    formData.append('features', 'speaker,embedding');
    const response = await firstValueFrom(
      this.httpService.post<TranscriptionDto[]>(
        `${TranscriptionApi.BASE_URL}/transcriptions`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      ),
    );
    const dto = response.data;
    return dto;
  }
}
