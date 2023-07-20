import { EnumUtils } from './enum.utils';

export enum ChannelEnum {
  REST = 'REST',
  RABBIT_MQ = 'RABBIT_MQ',
}

EnumUtils.register(ChannelEnum, { name: 'ChannelEnum' });
