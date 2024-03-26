import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnType, DataSource, DataSourceOptions } from 'typeorm';
import { WithLengthColumnType } from 'typeorm/driver/types/ColumnTypes';
import { Log } from '../log/log';
import { Voice } from '../voice/voice';
import { LogDao } from './dao/log.dao';
import { VoiceDao } from './dao/voice.dao';

export const ENTITIES = [Log, Voice];
export const DAOS = [LogDao, VoiceDao];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ENTITIES,
        synchronize: true,
      }),
      dataSourceFactory: async (options?: DataSourceOptions) => {
        let dataSource = await new DataSource(options);
        dataSource.driver.supportedDataTypes.push('vector' as ColumnType);
        dataSource.driver.withLengthColumnTypes.push(
          'vector' as WithLengthColumnType,
        );
        dataSource = await dataSource.initialize();
        return dataSource;
      },
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  providers: [...DAOS],
  exports: [...DAOS],
})
export class DatabaseModule {}
