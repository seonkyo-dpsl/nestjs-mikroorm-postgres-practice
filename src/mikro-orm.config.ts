import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { LoadStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

export const mikroOrmConfig = (configService: ConfigService) => {
  return defineConfig({
    dbName: configService.get('DATABASE_NAME'),
    user: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    host: configService.get('DATABASE_HOST'),
    port: parseInt(configService.get('DATABASE_PORT') ?? '5432', 10),

    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],

    metadataProvider: TsMorphMetadataProvider,
    debug: configService.get('NODE_ENV') !== 'production',
    loadStrategy: LoadStrategy.JOINED,
  });
};

export default mikroOrmConfig;
