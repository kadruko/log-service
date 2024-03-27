import { toSql } from 'pgvector';
import { ValueTransformer } from 'typeorm';

export class VectorTransformer implements ValueTransformer {
  public to(value: number[]): string {
    return toSql(value);
  }

  public from(value: string): number[] {
    return value.replace('[', '').replace(']', '').split(',').map(Number);
  }
}
