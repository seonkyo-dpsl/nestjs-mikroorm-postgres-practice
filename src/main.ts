import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import { isProd } from './common/constant';
import { HttpExceptionFilter } from './common/filters';
import { SuccessResponseInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          format: isProd
            ? format.combine(format.timestamp(), format.simple())
            : format.combine(
                format.timestamp(),
                format.colorize({ all: true }),
                nestWinstonModuleUtilities.format.nestLike('NestJS-Practice', {
                  prettyPrint: true,
                  colors: true,
                }),
              ),
        }),
      ],
    }),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
