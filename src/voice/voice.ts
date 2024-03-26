import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Log } from '../log/log';

@Entity()
export class Voice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string | null;

  @Column({ type: 'vector' as ColumnType })
  embedding: string | number[];

  @OneToMany(() => Log, (log) => log.voice)
  logs?: Log[];
}
