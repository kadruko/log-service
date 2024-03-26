import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogDao } from './dao/log.dao';
import { VoiceDao } from './dao/voice.dao';
import DATA_SOURCE, { DATA_SOURCE_OPTIONS, ENTITIES } from './data-source';

export const DAOS = [LogDao, VoiceDao];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DATA_SOURCE_OPTIONS,
      dataSourceFactory: async () => {
        const dataSource = DATA_SOURCE.initialize();
        return dataSource;
      },
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  providers: [...DAOS],
  exports: [...DAOS],
})
export class DatabaseModule {}
