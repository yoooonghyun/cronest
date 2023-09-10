import { EnumUtils } from './enum.utils';

/**
 * @enum
 * @description Enumeration of communication channels with the client.
 */
export enum ChannelEnum {
  GRPC = 'GRPC',
  REST = 'REST',
  RABBIT_MQ = 'RABBIT_MQ',
}

EnumUtils.register(ChannelEnum, { name: 'ChannelEnum' });
