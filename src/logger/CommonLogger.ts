/*
 * Copyright (c) 2022 Medir Inc.
 * Created on Fri Apr 22 2022
 */

import { Logger } from '@nestjs/common';

/**
 * @class
 * @description Custom logger class.
 * @extends {Logger}
 */
export class CommonLogger extends Logger {
  /**
   * @method @public
   * @description Erorr 출력.
   * @deprecated printErr로 대체.
   * @param {string} message - 출력 메세지.
   * @param {Error} err - Error 객체.
   * @param {any} params - 추가 파라미터.
   */
  public printError(message: string, err: Error, ...params: any) {
    super.error(
      `${message}${params.length ? `\nparameters:${JSON.stringify(params, null, 4)}` : ''}
${err.message}
${err.stack}`,
    );
  }

  /**
   * @method @public
   * @description Erorr 출력.
   * @param {string} callerName - 호출 함수.
   * @param {string} message - 출력 메세지.
   * @param {Error} err - Error 객체.
   * @param {any} params - 추가 파라미터.
   */
  public printErr(callerName: string, message: string, err: Error, ...params: any) {
    super.error(
      `${callerName}(): ${message}${
        params.length ? `\nparameters:${JSON.stringify(params, null, 4)}` : ''
      }
  ${err.message}
  ${err.stack}`,
    );
  }

  /**
   * @method @public
   * @description I/O 발생 시점에 로그 출력.
   * @param {string} ioType - I/O 타입.
   * @param {string} callerName - 호출 함수.
   * @param {string} message - 출력 메세지.
   * @param {any} params - 추가 파라미터.
   */
  public printLog(ioType: string, callerName: string, message: string, ...params: any) {
    super.log(
      `[${ioType}] ${callerName}(): ${message}${
        params.length ? `\nparameters:${JSON.stringify(params, null, 4)}` : ''
      }`,
    );
  }
}
