import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessages } from '../error-messages';
import { ErrorResponse } from '../dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? ErrorMessages.internalServerError
        : exception.message || exception.getResponse();

    this.logger.error(
      `Status: ${status} Error: ${errorMessage}`,
      exception.stack,
      `${request.method} ${request.url}`,
    );

    const httpResponse: ErrorResponse = {
      success: false,
      message: errorMessage,
      statusCode: status,
    };
    response.status(status).json(httpResponse);
  }
}
