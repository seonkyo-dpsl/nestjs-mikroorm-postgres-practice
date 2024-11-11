import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { isProd } from '../common/constant';

const commonLogFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('deepsales-admin-api', {
    colors: !isProd,
    prettyPrint: !isProd,
  }),
);

export const winstonConfig = {
  level: isProd ? 'warn' : 'debug',
  format: commonLogFormat,
  transports: [new winston.transports.Console({ format: commonLogFormat })],
  exceptionHandlers: [new winston.transports.Console({ format: commonLogFormat })],
  rejectionHandlers: [new winston.transports.Console({ format: commonLogFormat })],
};
