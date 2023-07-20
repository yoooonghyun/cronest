import { EnumUtils } from './enum.utils';

export enum JobRunningStateEnum {
  ON = 'ON',
  OFF = 'OFF',
}

EnumUtils.register(JobRunningStateEnum, { name: 'JobRunningStateEnum' });
