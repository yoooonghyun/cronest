import { EnumUtils } from './enum.utils';

export enum ResultEnum {
  SUCCESS = 'SUCCESS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

EnumUtils.register(ResultEnum, { name: 'ResultEnum' });
