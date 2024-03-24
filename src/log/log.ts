import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
