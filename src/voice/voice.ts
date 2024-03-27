import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WithLengthColumnType } from 'typeorm/driver/types/ColumnTypes';
import { VectorTransformer } from '../database/vector.transformer';
import { Log } from '../log/log';

@Entity()
export class Voice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string | null;

  @Column('vector' as WithLengthColumnType, {
    length: 256,
    transformer: new VectorTransformer(),
  })
  embedding: number[];

  @OneToMany(() => Log, (log) => log.voice)
  logs?: Log[];
}
