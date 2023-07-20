import { HttpException, HttpStatus } from '@nestjs/common';

export class ThirdpartyExceptionHandler {
  public static handle(err: Error): never {
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
