import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LogStatus } from './log.status';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  text?: string;

  @Column()
  timestamp: Date;

  @Column()
  status: LogStatus;

  @CreateDateColumn()
  createdAt: Date;
}
