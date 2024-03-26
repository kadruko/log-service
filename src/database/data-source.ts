import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  ColumnType,
  WithLengthColumnType,
} from 'typeorm/driver/types/ColumnTypes';
import { Log } from '../log/log';
import { Voice } from '../voice/voice';
import { Initial1711489753589 } from './migrations/1711489753589-Initial';

dotenv.config();

export const ENTITIES = [Log, Voice];
export const MIGRATIONS = [Initial1711489753589];

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ENTITIES,
  synchronize: false,
  migrations: MIGRATIONS,
  migrationsRun: true,
};

const DATA_SOURCE = new DataSource(DATA_SOURCE_OPTIONS);
DATA_SOURCE.driver.supportedDataTypes.push('vector' as ColumnType);
DATA_SOURCE.driver.withLengthColumnTypes.push('vector' as WithLengthColumnType);
export default DATA_SOURCE;
