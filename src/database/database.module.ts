import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../log/log';
import { LogDao } from './dao/log.dao';

export const ENTITIES = [Log];
export const DAOS = [LogDao];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DATABASE_HOST || 'localhost',
          port: Number(process.env.DATABASE_PORT) || 5432,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: ENTITIES,
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  providers: [...DAOS],
  exports: [...DAOS],
})
export class DatabaseModule {}
