import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from './logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = exception.getStatus();
    let exceptionMessage = exception.message;
    if (exception instanceof HttpException) {
    } else {
      status = 500;
      exceptionMessage = 'Internal server error';
    }
    const errorMessage = `Message: ${exceptionMessage} - Status Code: ${status}`;
    this.logger.error(errorMessage);

    httpAdapter.reply(
      response,
      {
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
      },
      status,
    );
  }
}
