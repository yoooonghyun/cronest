import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

/**
 * @class
 * @description Logger class for logging HTTP results.
 * @extends NestMiddleware
 */
@Injectable()
export class HttpLogger implements NestMiddleware {
  private logger = new Logger(HttpLogger.name);

  /**
   * @public @method
   * @param {Request} request HTTP request.
   * @param {Response} response HTTP response.
   * @param {NextFunction} next Next handler function.
   */
  public use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl}, statusCode: ${statusCode}, contentLength: ${contentLength}, - from ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
