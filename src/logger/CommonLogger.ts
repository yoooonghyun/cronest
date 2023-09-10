import { Logger } from '@nestjs/common';

/**
 * @class
 * @description Custom logger class.
 * @extends {Logger}
 */
export class CommonLogger extends Logger {
  /**
   * @method @public
   * @description Print error log.
   * @param {string} callerName - Name of caller class.
   * @param {string} message - Message to print.
   * @param {Error} err - Thrown error object.
   * @param {any} params - Additional parameters.
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
   * @description Print infomation log.
   * @param {string} ioType - Typeof I/O.
   * @param {string} callerName - Name of caller class.
   * @param {string} message - Message to print.
   * @param {any} params - Additional parameters.
   */
  public printLog(ioType: string, callerName: string, message: string, ...params: any) {
    super.log(
      `[${ioType}] ${callerName}(): ${message}${
        params.length ? `\nparameters:${JSON.stringify(params, null, 4)}` : ''
      }`,
    );
  }
}
