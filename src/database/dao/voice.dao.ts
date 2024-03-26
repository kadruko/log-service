import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toSql } from 'pgvector';
import { Repository } from 'typeorm';
import { Voice } from '../../voice/voice';
import { VoiceResult } from '../../voice/voice.result';

@Injectable()
export class VoiceDao {
  constructor(
    @InjectRepository(Voice)
    private repository: Repository<Voice>,
  ) {}

  async save(voice: Voice): Promise<Voice> {
    voice.embedding = toSql(voice.embedding);
    return this.repository.save(voice);
  }

  async findClosest(embedding: number[]): Promise<VoiceResult | null> {
    const result = new VoiceResult();

    result.voice = await this.repository
      .createQueryBuilder('voice')
      .orderBy('embedding <=> :embedding')
      .setParameters({ embedding: toSql(embedding) })
      .limit(1)
      .getOne();

    if (!result.voice) {
      return null;
    }

    result.cosineDistance = (
      await this.repository
        .createQueryBuilder('voice')
        .select('embedding <=> :embedding', 'cosineDistance')
        .setParameters({ embedding: toSql(embedding) })
        .where('id = :id', { id: result.voice.id })
        .getRawOne<VoiceResult>()
    ).cosineDistance;

    return result;
  }
}
