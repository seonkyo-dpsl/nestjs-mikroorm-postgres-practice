import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as fs from 'fs';
import * as path from 'path';
import { isProd } from './common/constant';

const ormConfigPath = path.join(__dirname, '../ormconfig.json');
const ormConfig = JSON.parse(fs.readFileSync(ormConfigPath, 'utf-8'));

const config = {
  ...ormConfig,
  dbName: ormConfig.dbName,
  host: ormConfig.host,
  port: ormConfig.port,
  user: ormConfig.user,
  password: ormConfig.password,
};

const createMikroOrmConfig = defineConfig({
  ...config,
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: !isProd,
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: false,
    safe: false,
    snapshot: true,
  },
});

export default createMikroOrmConfig;
