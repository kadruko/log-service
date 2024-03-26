import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Voice } from '../voice/voice';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  text?: string;

  @Column()
  timestamp: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  voiceId?: string | null;

  @ManyToOne(() => Voice, (voice) => voice.logs, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'voiceId', referencedColumnName: 'id' })
  voice?: Voice;
}
