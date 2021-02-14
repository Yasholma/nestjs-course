import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as config from 'config';

const {
  host,
  username,
  password,
  synchronize,
  type,
  port,
  database,
} = config.get('db');

export const typeORMconfig: TypeOrmModuleOptions = {
  type,
  host: process.env.RDS_HOST || host,
  port: process.env.RDS_POST || port,
  username: process.env.RDS_USERNAME || username,
  password: process.env.RDS_PASSWORD || password,
  database: process.env.RDS_DB_NAME || database,
  synchronize: process.env.TYPE_ORM || synchronize,
  entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
};
