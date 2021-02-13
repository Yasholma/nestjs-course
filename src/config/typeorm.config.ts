import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yasholma',
  password: '',
  database: 'taskmanager',
  entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
  synchronize: true,
};
