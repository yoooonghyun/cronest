import { EnumUtils } from './enum.utils';

export enum EventHandleTypeEnum {
  CREATED = 'CREATED',
  STATE_CHANGED = 'STATE_CHANGED',
  INFO_CHANGED = 'INFO_CHANGED',
  DELETED = 'DELETED',
}

EnumUtils.register(EventHandleTypeEnum, { name: 'EventHandleTypeEnum' });

export enum EventStateEnum {
  CREATED = 'CREATED',
  PUBLISHED = 'PUBLISHED',
}

EnumUtils.register(EventStateEnum, { name: 'EventStateEnum' });
